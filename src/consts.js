
export const KEYMAP = [
  {
    id: 0,
    label: {
      "#":"C",
      "b":"C",
    },
    primary: "#546E61",
    secondary: "#1B231F "
  },
  {
    id: 1,
    label: {
      "#":"C#",
      "b":"Db",
    },
    primary: "#915D3B",
    secondary: "#F3E9E2"
  },
  {
    id: 2,
    label: {
      "#":"D",
      "b":"D",
    },
    primary: "#D7D8C0",
    secondary: "#1D201D"
  },
  {
    id: 3,
    label: {
      "#":"D#",
      "b":"Eb",
    },
    primary: "#4F5054",
    secondary: "#EAEAEB"
  },
  {
    id: 4,
    label: {
      "#":"E",
      "b":"E",
    },
    primary: "#CDAD8E",
    secondary: "#2F1D0E"
  },
  {
    id: 5,
    label: {
      "#":"F",
      "b":"F",
    },
    primary: "#3B5151",
    secondary: "#B8CCCC"
  },
  {
    id: 6,
    label: {
      "#":"F#",
      "b":"Gb",
    },
    primary: "#E98035",
    secondary: "#251204"
  },
  {
    id: 7,
    label: {
      "#":"G",
      "b":"G",
    },
    primary: "#AEC5B3",
    secondary: "#111812"
  },
  {
    id: 8,
    label: {
      "#":"G#",
      "b":"Ab",
    },
    primary: "#69584F",
    secondary: "#EDEAE8"
  },
  {
    id: 9,
    label: {
      "#":"A",
      "b":"A",
    },
    primary: "#C7C7BD",
    secondary: "#302C22"
  },
  {
    id: 10,
    label: {
      "#":"A#",
      "b":"Bb",
    },
    primary: "#374C58",
    secondary: "#E9EBED"
  },
  {
    id: 11,
    label : {
      "#":"B",
      "b":"B",
      "6b":"Cb",
    },
    primary: "#D19361 ",
    secondary: "#1F1309"
  },
]

export const INTERVALS = {
  "LYDIAN" : ["I","V","II","vi","iii","vii","iv\u00B0"],
  "IONIAN" :["IV","I","V","ii","vi","iii","vii\u00B0"],
  "MIXOLYDIAN" : ["VII","IV","I","v","ii","vi","iii\u00B0"],
  "DORIAN" :["III","VII","IV","i","v","ii","vi\u00B0"],
  "AEOLIAN" : ["VI","III","VII","iv","i","v","ii\u00B0"],
  "PHYRGIAN" : ["II","VI","III","vii","iv","i","v\u00B0"],
  "LOCRIAN" : ["V","II","VI","iii","vii","iv","i\u00B0"],
}

export const RELATIVEMODES = [
  "MAJ","MAJ","MAJ","MIN","MIN","MIN","DIM"
]

export const MODEINDEX = {
  "LYDIAN": 0,
  "MIXOLYDIAN": 1,
  "AEOLIAN": 2,
  "LOCRIAN": 3,
  "IONIAN": 4,
  "DORIAN": 5,
  "PHYRGIAN": 6,
}

export const KEYLABELS = {
  "b":["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],
  "#":["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],
}   

export const CHORDTYPES = [
  "TRIAD","7","9","11","13"
]