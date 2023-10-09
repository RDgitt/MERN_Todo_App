import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { fetchAllTodos } from "../network";
export const TodosContext = createContext();

const TodosContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const getTodos = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("accessToken"),
      };

      // Make a POST request to your API with the form values and headers
      const response = await axios.get(fetchAllTodos, { headers });
      console.log("response", response);
      if (response) {
        setData([...data, response?.data]);
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting form:", error.message);
    }
  };

  useEffect(() => {
   
    getTodos();
  }, []);
  return (
    <TodosContext.Provider value={{ data, setData }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
