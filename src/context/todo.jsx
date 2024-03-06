import { useContext, createContext } from "react";

const todo = createContext({
  render: true,
  toggleRender: () => {},
});


export const useTodo = () => {
    return useContext(todo);
  };
  
  export const TodoProvider = todo.Provider;
  