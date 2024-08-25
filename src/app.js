import React from "react";
import { useState, useEffect, useContext } from "react";
import { useStdin, Text, useInput, Box, useApp } from "ink";
import fs from "fs";
import { UncontrolledTextInput } from "ink-text-input";
import { AppContext } from "./Contexts.js";

// const dataFilePath = path.resolve(__dirname, 'todos.json');
const dataFilePath = new URL("todos.json", import.meta.url).pathname;
/* get todos from a file*/
function loadTodos() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // returns empty array if file doesn't exist or data is invalid
    return [];
  }
}
//save todos to a file
function saveTodos(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data), "utf8");
  } catch (error) {
    console.error("Error saving todo data:", error);
  }
}

function InputBox({ borderStyle, placeholder }) {
  const {
    ipData,
    setIpData,
    todos,
    setTodos,
    inputFocus,
    setInputFocus,
    updateMode,
    setUpdateMode,
    selectedId,
  } = useContext(AppContext);
  const handleSubmit = (val) => {
    if (updateMode) {
      val &&
        setTodos((prev) => {
          const newTodos = prev.map((todo, index) => {
            return index === selectedId ? val : todo;
          });
          return newTodos;
        });
      setUpdateMode(false);
      setInputFocus(false);
      setIpData("");
      saveTodos(todos);
    } else {
      val &&
        setTodos((prevData) => {
          const newData = prevData;
          newData.push(`${val.trim()}`);
          return newData;
        });
      setIpData("");
      setInputFocus(false);
      saveTodos(todos);
    }
  };
  return (
    <>
      <Box flexGrow={1} borderStyle={borderStyle} borderColor="green">
        <UncontrolledTextInput
          focus={inputFocus}
          value={ipData}
          onChange={setIpData}
          placeholder={placeholder}
          onSubmit={handleSubmit}
        />
      </Box>
    </>
  );
}

function handleKeyPress(letter, key, appContext) {
  const {
    todos,
    inputFocus,
    setInputFocus,
    selectedId,
    setSelectedId,
    updateMode,
    setUpdateMode,
    setTodos,
    gCount,
    setGCount,
  } = appContext;
  if (!key) return;
  if (!updateMode && !inputFocus) {
    if (letter === "a") {
      //adding a todo
      setInputFocus(true);
      if (gCount.length == 1) setGCount([]);
    } else if (letter == "k" || key.upArrow) {
      //navigation
      selectedId > 0 && setSelectedId((prev) => prev - 1);
      if (gCount.length == 1) setGCount([]);
    } else if (letter == "j" || key.downArrow) {
      selectedId < todos.length - 1 && setSelectedId((prev) => prev + 1);
      if (gCount.length == 1) setGCount([]);
    } else if (letter === "u") {
      //updating
      setUpdateMode(true);
      setInputFocus(true);
      if (gCount.length == 1) setGCount([]);
    } else if (letter === "d") {
      //deleting
      setTodos((prev) => {
        const newTodos = prev.filter((_, index) => index != selectedId);
        return newTodos;
      });
      saveTodos(todos);
      if (gCount.length == 1) setGCount([]);
    } else if (letter == "g") {
      if (gCount.length == 0) setGCount(["g"]);
      if (gCount.length == 1) {
        setSelectedId(0);
        setGCount([]);
      }
    } else if (letter === "G") setSelectedId(todos.length - 1);
  }
}

function Header() {
  return (
    <>
      <Box justifyContent="center">
        <Text bold>TERM-TODO</Text>
      </Box>
    </>
  );
}
function TodosListing() {
  const { todos, selectedId, updateMode, inputFocus } = useContext(AppContext);
  const color = "green";
  return (
    <>
      <Box borderColor={color} flexDirection="column" borderStyle="round">
        <Box
          columnGap={1}
          flexDirection="column"
          flexGrow={1}
          paddingX={2}
          paddingY={1}
        >
          {!todos.length && (
            <Box padding={1} justifyContent="center" alignItems="center">
              <Text>No Todos set</Text>
            </Box>
          )}
          {todos.map((todo, index) => {
            return (
              <Box key={index}>
                {updateMode && selectedId === index ? (
                  <InputBox
                    placeholder="ENTER UPDATED TODO"
                    borderStyle="classic"
                  />
                ) : (
                  <Text color={color} key={index}>
                    {`${todo}`}
                  </Text>
                )}
              </Box>
            );
          })}
          {inputFocus && !updateMode && (
            <InputBox placeholder="ENTER TODO" borderStyle="round" />
          )}
        </Box>
      </Box>
    </>
  );
}
function App() {
  const [todos, setTodos] = useState(loadTodos || ["sample"]);
  const [ipData, setIpData] = useState("sample");
  const [inputFocus, setInputFocus] = useState(false);
  const [terminalWidth, setTerminalWidth] = useState(147);
  const [selectedId, setSelectedId] = useState(0);
  const [updateMode, setUpdateMode] = useState(false);
  const [gCount, setGCount] = useState([]);
  const { exit } = useApp();

  useEffect(() => {
    let todoList = loadTodos();
    setTodos(todoList);
  }, []);

  useInput((letter, key) => {
    handleKeyPress(letter, key, {
      updateMode,
      setUpdateMode,
      selectedId,
      setSelectedId,
      terminalWidth,
      setTerminalWidth,
      todos,
      setTodos,
      ipData,
      setIpData,
      inputFocus,
      setInputFocus,
      gCount,
      setGCount,
    });
    if (!inputFocus && !updateMode && letter === "q") {
      saveTodos(todos);
      exit();
    }
  });
  return (
    <>
      <AppContext.Provider
        value={{
          updateMode,
          setUpdateMode,
          selectedId,
          setSelectedId,
          terminalWidth,
          setTerminalWidth,
          todos,
          setTodos,
          ipData,
          setIpData,
          inputFocus,
          setInputFocus,
          gCount,
          setGCount,
        }}
      >
        <Box flexDirection="column">
          <Header />
          <TodosListing />
        </Box>
      </AppContext.Provider>
    </>
  );
}
const Main = () => {
  return <App />;
};
export default Main;
