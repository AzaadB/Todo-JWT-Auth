import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodoContextProvider } from "./context/TodoContext";//importing the TodoContextProvider
import { AuthContextProvider } from "./context/AuthContext";// importing the authContextProvider//

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
  /*Wrapping the whole appliction including the TodoContextProvider, 
  within the AuthContextProvider (lines 10-14)*/
);
