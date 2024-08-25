import { createContext } from "react";
export const AppContext = createContext({
  updateMode: false,
  setUpdateMode: () => {},
  selectedId: 0,
  setSelectedId: () => {},
  todos: [],
  setTodos: () => {},
  ipData: "",
  setIpData: () => {},
  inputFocus: false,
  setInputFocus: () => {},
});
