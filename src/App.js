import logo from "./logo.svg";
import "./App.css";
import * as ts from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { useRef } from "react";
import { drawMesh } from "./util";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const style = { position: "absolute",
marginLeft: "auto",
marginRight: "auto",
left: 0,
right: 0,
textAlign: "center",
zindex: 9,
width: 640,
height: 480,}

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFaceMesh = async () => {
    const net = await facemesh.load({
      inputResolution: {widht: 640, height: 400},
      scale: 0.8
    })

    setInterval(()=>{
      detect(net)
    }, 10)
  }

  const detect = async (net) => {
    if(
      typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4
    ){
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
      console.log(face)

      const ctx = canvasRef.current.getContext("2d")

      drawMesh(face, ctx)
    }
  }
  runFaceMesh();
  return (
    <div className="App">
      <header className="App-header">
        <Webcam videoConstraints={videoConstraints} ref={webcamRef} mirrored={false} style={style}/>
        <canvas ref={canvasRef} style={style}/>
      </header>
    </div>
  );
}

export default App;