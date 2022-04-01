import React from "react";
import "@tensorflow/tfjs-backend-webgl";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { Landing } from "./components/Landing";
import { Footer } from './components/Footer';

const App = () => {
  return (
    <div>
    <div id='app'>
      <Navbar />
      <Routes />
    </div>
    <div>
      <Footer />
    </div>
    </div>
  );
};

export default App;
