import React from "react";
import { useState, useEffect, useContext } from "react";
import { useStdin, Text, useInput, Box, useApp } from "ink";
import { AppContext } from "./Contexts.js";
function Header() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    bold: true
  }, "TERM-TODO")));
}
function TodosListing() {
  const {
    todos
  } = useContext(AppContext);
  const color = "green";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    borderColor: color,
    flexDirection: "column",
    borderStyle: "round"
  }, /*#__PURE__*/React.createElement(Box, {
    columnGap: 1,
    flexDirection: "column",
    flexGrow: 1,
    paddingX: 2,
    paddingY: 1
  }, !todos.length && /*#__PURE__*/React.createElement(Box, {
    padding: 1,
    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Text, null, "No Todos set")), todos.map((todo, index) => {
    return /*#__PURE__*/React.createElement(Box, {
      key: index
    }, /*#__PURE__*/React.createElement(Text, {
      color: color,
      key: index
    }, `${todo}`));
  }))));
}
function App() {
  const [todos, setTodos] = useState(["sample", "another sample"]);
  const {
    exit
  } = useApp();
  useEffect(() => {}, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: {
      todos,
      setTodos
    }
  }, /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(TodosListing, null))));
}
const Main = () => {
  return /*#__PURE__*/React.createElement(App, null);
};
export default Main;