import { MODEINDEX, KEYLABELS, RELATIVEMODES } from "./consts";


export const getScale = ( base,mode, accedental ) => {

  const intervals = [2,2,2,1,2,2,1];

  const tonicIdx = base*7%12;
  const modeIdx = MODEINDEX[mode];
  const includesCb = base - MODEINDEX[mode]*2%7 + 1 === 6;
  
  const repositionedIntervals = [ ...intervals.slice(modeIdx), ...intervals.slice(0,modeIdx) ];
  const keyArray = KEYLABELS[accedental];

  let acc = tonicIdx;
  const scale = repositionedIntervals.map( int => {
    const nextKey = keyArray[acc%12];
    acc += int;
    return nextKey;
  });

  // handling special case where a b is written as Cb
  if (!!includesCb) {
    const index = scale.indexOf("B");
    if (index !== -1) {
      scale[index] = "Cb";
    }
  }

  return scale;

}

export const parseScale = model => {
  const { scale } = model;

  let octaveNumber = 4;
  if (["C#","C","B","Bb"].includes(scale[0])) {octaveNumber -= 1};
  
  const extendedScale = [...scale,scale[0]];

  const parsedScale = extendedScale.map((note,_i) => {

    if (["C","C#","Cb"].includes(note)) {octaveNumber++};

    return [note + "/" + octaveNumber]

  });

  return parsedScale;

}

export const getChord = (model,chordData) => {
  const { accedental,scale,mode } = model;
  const { tonicIdx , type } = chordData;
  const modeIdx = MODEINDEX[mode]*2 % 7;

  const enteredNextOctave = (notes, idx) => {

    if (idx === 0) {return false};

    const prevNote = notes[idx -1] === "Cb" ? "B" : notes[idx -1];
    const nextNote = notes[idx];

    const prevNoteIdx = KEYLABELS[accedental].indexOf(prevNote);
    const nextNoteIdx = KEYLABELS[accedental].indexOf(nextNote);

    console.log({prevNoteIdx,nextNoteIdx})

    return prevNoteIdx > nextNoteIdx;

  }

  const keyArray = KEYLABELS[accedental];
  const tonicNote = scale[tonicIdx] !== "Cb" ? scale[tonicIdx] : "B";
  const tonic12ToneIdx = keyArray.indexOf(tonicNote);
  
  const chordType = type === "TRIAD" ? "" : type.toLowerCase();
  const relativeModeIdx = (modeIdx + tonicIdx * 2) % 7;
  const relativeMode = RELATIVEMODES[ relativeModeIdx ];
  const modeLabel = relativeMode === "MIN" ? "m" :
    relativeMode === "DIM" ? "\u00B0" : "";

  const chordName = tonicNote + modeLabel + chordType;
  
  const nl = {
    "1th": scale[(tonicIdx + 0)%7],
    "3th": scale[(tonicIdx + 2)%7],
    "4th": scale[(tonicIdx + 3)%7],
    "5th": scale[(tonicIdx + 4)%7],
    "6th": scale[(tonicIdx + 5)%7],
    "b5th": keyArray[(tonic12ToneIdx+5)%12],
    "7th": keyArray[(tonic12ToneIdx+10)%12],
    "MAJ7th": keyArray[(tonic12ToneIdx+11)%12],
    "9th": keyArray[(tonic12ToneIdx+13)%12],
    "11th": keyArray[(tonic12ToneIdx+16)%12],
    "13th": keyArray[(tonic12ToneIdx+19)%12],
  };
  
  let chord = [];
  switch(type) {
    case "TRIAD":
      chord = [
        nl["1th"],
        nl["3th"],
        nl["5th"],
      ]
      break;
    case "7":
      chord = [
        nl["1th"],
        nl["3th"],
        nl["5th"],
        nl["7th"],
      ]
      break;
    case "maj7":
      chord = [
        nl["1th"],
        nl["3th"],
        nl["5th"],
        nl["MAJ7th"],
      ]
      break;
    case "9":
      chord = [
        nl["1th"],
        nl["3th"],
        nl["5th"],
        nl["7th"],
        nl["9th"],
      ]
      break;
    case "11":
      chord = [
        nl["1th"],
        nl["3th"],
        nl["5th"],
        nl["7th"],
        nl["9th"],
        nl["11th"],
      ]
      break;
    case "13":
      chord = [
        nl["1th"],
        nl["3th"],
        nl["5th"],
        nl["7th"],
        nl["9th"],
        nl["11th"],
        nl["13th"],
      ]
      break;
    default: chord = [];
  }

  let octaveNumber = ["B","Bb",].includes(tonicNote) ? 3 : 4;
  
  const parsedChord = [chord.map( (note,_i,notes) => {
    if (enteredNextOctave(notes,_i)) {octaveNumber++}
    return note + "/" + octaveNumber;
  })];

  return [chordName,parsedChord];

}