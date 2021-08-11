import { useState } from "react";

import Navbar from "./Navbar";
import CircleOfFifths from "./Circle";
import Sidebar from "./Sidebar";
import { MODEINDEX } from "./consts";
import { getScale } from "./helpers";



function App() {

  const [ model,setModel ] = useState({
    base: 0,
    mode: "IONIAN",
    accedental: "#",
    scale: getScale(0,"IONIAN","#")
  });

  const setBase = base => {
    setModel( prev => {

      const accedental = (base - MODEINDEX[prev.mode]*2%7 + 1 ).mod(12) < 6 ? "#" : "b";
      const scale = getScale(base,prev.mode,accedental);
      return {
        ...prev,
        base: base,
        accedental,
        scale,
      }
    })
  }

  const setMode = mode => {
    setModel( prev => {
      const accedental = (prev.base - MODEINDEX[mode]*2%7 + 1 ).mod(12) < 6 ? "#" : "b";
      const scale = getScale(prev.base,mode,accedental);
      return {
        ...prev,
        mode: mode,
        accedental,
        scale, 
      }
    })
  }

  return (
    <div className="App dark-theme">
      <Navbar model = {model} setBase = {setBase} setMode = {setMode}/>
      <div className = "content-container">
        <CircleOfFifths model = {model} setBase = {setBase} />
        <Sidebar model = {model}/>
      </div>
    </div>
  );
}

export default App;
