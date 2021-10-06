import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  if (localStorage.getItem("token") == null) {
    return <Login />;
  } else {
    return <Home />;
  }
}

export default App;
