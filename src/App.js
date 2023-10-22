import logo from "./logo.svg";
import "./App.css";
import * as ts from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { useRef } from "react";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null)
  return (
    <div className="App">
      <header className="App-header">
        <Webcam videoConstraints={videoConstraints} ref={webcamRef}/>
      </header>
    </div>
  );
}

export default App;
