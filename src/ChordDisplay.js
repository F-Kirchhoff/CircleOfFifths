import { useState } from "react";
import { StaveDisplay } from "./VexFlowComponents";
import { getChord } from "./helpers";
import { CHORDTYPES } from "./consts";

const ChordDisplay = props => {
  const {model, options} = props;

  const [chordData, setChordData] = useState({
    tonicIdx: 0,
    type: "TRIAD",
  })

  const [chordName,parsedChord] = getChord(model, chordData);

  return (
    <div style = {{
      color: "var(--primary-dark)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      justifyContent:"space-around",
      width: "100%",
      height: "300px",
    }}>
      <div className = "chordName">
        {chordName}
      </div>
      <StaveDisplay 
        style = {{}} 
        model = {model} 
        options = {options} 
        content = {parsedChord}
      />
      <div className = "chordSelector" >
        <select
          value = {chordData.tonicIdx}
          onChange = {e => setChordData(prev => {
            return {
              ...prev,
              tonicIdx: parseInt(e.target.value)
            }
          })} 
        >
          <option selected value = {0}>I</option>
          <option value = {1}>II</option>
          <option value = {2}>III</option>
          <option value = {3}>IV</option>
          <option value = {4}>V</option>
          <option value = {5}>VI</option>
          <option value = {6}>VII</option>
        </select>

        <select
          value = {chordData.intervals}
          onChange = {e => setChordData(prev => {
            return {
              ...prev,
              type: e.target.value,
            }
          })} 
        > 
          {CHORDTYPES.map( type => <option key = {type} value = {type}> {type === "TRIAD" ? "-": type} </option>)}
          
        </select>
      </div>
    </div>
  )

}

export default ChordDisplay