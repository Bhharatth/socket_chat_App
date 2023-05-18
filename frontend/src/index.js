import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Messenger from "./pages/Messenger/Messenger";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
