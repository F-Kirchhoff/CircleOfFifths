import Vex from "vexflow";
import { useEffect, useRef, useState } from "react";

const VF = Vex.Flow;

const parseChord = (noteLabels,options) =>{
  const  chord = new VF.StaveNote({
    clef: "treble", 
    keys: noteLabels,
    duration: options.duration,
  })

  chord.getKeys().map( (note, _i) => {
    if (note.includes("b")) {
      chord.addAccidental(_i, new VF.Accidental("b"))
    } else if (note.includes("#")) {
      chord.addAccidental(_i, new VF.Accidental("#"))
    } 
  })
  
  return chord;
}

export const KeySignature = props => {
  const {tonic} = props;
  const scoreEl = useRef(null);
  
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth,
  })
  const size = Math.min(dimensions.width,dimensions.height);
  
  
  // initial hook for resizing when window size changes
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  });
  
  
  // hook for updating key signature when key changes
  useEffect(() => {
    if (scoreEl.current) {
      
      if (scoreEl.current.firstChild) {scoreEl.current.firstChild.remove()}
      
      const VF = Vex.Flow;
      // Create an SVG renderer and attach it to the DIV element named "boo".
      const div = scoreEl.current;
      const w = div.clientWidth;
      const h = div.clientHeight;

      
    
      const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      
      renderer.resize(w, h);
      const context = renderer.getContext();
      const stave = new VF.Stave((Math.min(w,h) - 100 )/2, 0, Math.min(w,h)*0.8);
      
      stave.addClef("treble");
      stave.addKeySignature(tonic);
      stave.setContext(context).draw();
    }
  });
  return (<div
    ref = {scoreEl}
    className = "w4 h4 absolute"
    style = {{
      top: "50%",
      left: "50%",
      transform: ` translate(-50%,-50%) scale(${size*0.002}) `,
    }}
    ></div>);
}

// .addAnnotation(0,new VF.Annotation(INTERVALS[model.mode][_i%7])
//       .setVerticalJustification("bottom")
//       .setFont('robotoSlab',15,'bold')
//   )

export const StaveDisplay = props => {
  const {model, options, content} = props;

  const scoreEl = useRef(null);

  useEffect(() => {
    if (scoreEl.current) {
      
      if (scoreEl.current.firstChild) {scoreEl.current.firstChild.remove()}
      
      // Create an SVG renderer and attach it to the DIV element named "boo".
      const div = scoreEl.current;
      const w = div.clientWidth;
      const h = div.clientHeight;

      const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      
      renderer.resize(w, h);
      const context = renderer.getContext();
      const stave = new VF.Stave(0, 0, w);

      if (options.addClef) {stave.addClef("treble");}
      stave.setContext(context).draw();

      const notes = content.map( chord => parseChord(chord,options));

      // Helper function to justify and draw a 4/4 voice
      VF.Formatter.FormatAndDraw(context, stave, notes);

    }
  });

  return (<div
    ref = {scoreEl}
    className = ""
    style = {options.style}
    ></div>);
}

