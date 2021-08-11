
import { StaveDisplay } from "./VexFlowComponents";
import ChordDisplay from "./ChordDisplay";
import { KEYMAP } from "./consts";
import { parseScale } from "./helpers";
import Keys from "./Keys.js";

const SCALEFAKTOR = 1.3;

const Sidebar = props => {
  const { model } = props;
  
  const scaleOptions = {
    style: {
      width: `${100/SCALEFAKTOR}%`,
      height: "130px",
      transform: `scale(${SCALEFAKTOR})`,
    },
    addClef: true,
    duration: "w",
  }
  const chordOptions = {
    style: {
      width: `${100/SCALEFAKTOR}%`,
      height: "130px",
      transform: `scale(${SCALEFAKTOR})`,
    },
    addClef: false,
    duration: "q",
  }


  const parsedScale = parseScale(model);

  const modeLabellower = model.mode === "IONIAN" ? "major" : model.mode === "AEOLIAN" ? "minor" : model.mode.toLowerCase();
  const modeLabel = modeLabellower[0].toUpperCase() + modeLabellower.slice(1);

  return (
    <div className = "Sidebar">

      <h2 
        style = {{textDecoration: `underline 8px ${KEYMAP[model.base*7%12].primary}`}}
      >{ KEYMAP[model.base*7%12].label[model.accedental] + " " + modeLabel }</h2>

      <Keys model = {model}></Keys>

      <StaveDisplay model = {model} options = {scaleOptions} content = {parsedScale}/>
      
      <div style = {{
        display: "flex",
        justifyContent:"space-between",
        width: "100%"
      }}>
        <ChordDisplay model = {model} options = {chordOptions} />
        <ChordDisplay model = {model} options = {chordOptions} />
        <ChordDisplay model = {model} options = {chordOptions} />
        <ChordDisplay model = {model} options = {chordOptions} />
      </div>
    </div>
  )
}

export default Sidebar;