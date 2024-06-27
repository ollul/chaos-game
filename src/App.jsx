import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";


const App = () => {
  const [status, setStatus] = useState('pending');
  const [points, setPoints] = useState([]);
  const [r, setR] = useState(0.5);
  const canvasRef = useRef(null);

  const handleStart = () => {
    if(points.length > 2) {
      setStatus('started');
      canvasRef.current?.start?.({ r });
    }
  };

  const handlePause = () => {
    setStatus('pause');
    canvasRef.current?.pause();
  };
  const handleReset = () => {
    setStatus('pending');
    setPoints([]);
    canvasRef.current?.reset();
  };

  useEffect(() => {
    canvasRef.current?.setInitialPoints?.(points);
}, [points])
  
  return (<>
    <Sidebar setPoints={setPoints} setR={setR} r={r} status={status} onPause={handlePause} onReset={handleReset} onStart={handleStart} canvasRef={canvasRef}/>
    <Canvas points={points} r={r} ref={canvasRef}/>
  </>);
};

export default App;
