import { KEYMAP, KEYLABELS } from "./consts";

const Key = props => {
  const { keyIdx, keyColor, position, isWhite } = props;

  const label = KEYLABELS["#"][keyIdx];

  const blackKeyPositionModifier = ["C#","F#"].includes(label) ?
    7.5 : ["D#","A#"].includes(label) ?
    6.5 : 7 ;

  return isWhite ? 
    <div
      style = {{
        width: "10%",
        height: "230px",
        position: "absolute",
        top: "0",
        left: 10*position + "%",
        backgroundColor: keyColor,
        border: "solid 1px black",
        zIndex: "1",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
      }}
      /> :
      <div
      style = {{
        width: "6%",
        height: "150px",
        position: "absolute",
        top: "0",
        left: (10*position + blackKeyPositionModifier) + "%",
        backgroundColor: keyColor,
        border: "solid 1px black",
        zIndex: "2",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
      }}
    />;
}

const Keys = props => {
  const {model} = props;

  const keyData = KEYMAP[model.base * 7 % 12]
  const scaleColor = keyData.primary;
  const xShift = ["C","D","E","F","G","A","B"].indexOf(keyData.label["#"][0]);

  let position = 0;
  let scaleCounter = 0;

  return <div style= {{
    width: "100%",
    height: "250px",
    position: "relative",
    overflow: "hidden",
  }}>
    {[...Array(30).keys()].map(keyIdx => {
      
      const relativeKeyIdx = (keyIdx+10)%12;
      const keyLabel = KEYLABELS[model.accedental][relativeKeyIdx];
      const isWhite = ! (keyLabel.includes("b") || keyLabel.includes("#"));
      const isInScale = keyIdx > 1 && scaleCounter < 8 && (keyLabel === model.scale[scaleCounter%7] || ( model.scale[scaleCounter%7] === "Cb" && keyLabel === "B")) ;

      if (!!isInScale) {scaleCounter++};

      const keyColor = isInScale ? scaleColor : isWhite ? "white" : "black";

      if (isWhite) {position++};

      return <Key 
        key = {keyIdx}
        keyIdx = {relativeKeyIdx} 
        position = {position - xShift - 1} 
        isWhite = {isWhite}
        keyColor = {keyColor}
      />

    })}
  </div>

}

export default Keys;