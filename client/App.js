import React from "react";
import "@tensorflow/tfjs-backend-webgl";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { Landing } from "./components/Landing";

const App = () => {
  return (
    <div id='app'>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
