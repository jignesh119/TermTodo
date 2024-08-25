import React from "react";
import { useState, useEffect, useContext } from "react";
import { useStdin, Text, useInput, Box, useApp } from "ink";
import { AppContext } from "./Contexts.js";

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
  const { todos } = useContext(AppContext);
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
                <Text color={color} key={index}>
                  {`${todo}`}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
function App() {
  const [todos, setTodos] = useState(["sample", "another sample"]);
  const { exit } = useApp();

  useEffect(() => {}, []);

  return (
    <>
      <AppContext.Provider
        value={{
          todos,
          setTodos,
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
