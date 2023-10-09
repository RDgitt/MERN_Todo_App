import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TodosContextProvider from "./context/TodosContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodosContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TodosContextProvider>
);
