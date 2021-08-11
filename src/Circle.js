
import { useEffect, useRef, useState } from "react";
import { KEYMAP, INTERVALS,MODEINDEX } from "./consts";
import { KeySignature } from "./VexFlowComponents";

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
};

const Slice = props => {
  const {position, _key, accedental,options: {background,keyDisplay,interval},handleClick} = props;

  return (
    <div
    style = {{
      position: "absolute",
      width: "5%",
      height: "5%",
      top: "50%",
      left: "50%",
      transformOrigin: "bottom left",
      transform:  `translate(-0%,-100%) rotate(${-45 + 30 * position}deg)`,
    }}
    >

    {/* Background Fill */}
    <div
      className = {background}
      style = {{
        position: "absolute",
        backgroundColor: _key.primary,
        color: _key.secondary,
        width: "1000%",
        height: "1000%",
        bottom: "0",
        left: "0",
        transformOrigin: "bottom left",
        transform: `skew(-30deg,-30deg)`,
        border: "1px solid #333",
        transition: ".2s",
      }} 
      />

    {/* Key Indicator */}
    <div
      className = {`absolute br-pill flex justify-center items-center pointer b shadow-1 ${keyDisplay}`}
      style = {{
        backgroundColor: _key.primary,
        color: _key.secondary,
        width: "250%",
        height: "250%",
        bottom: "450%",
        left: "450%",
        transform: `rotate(${45 - 30 * position}deg`,
        userSelect: "none",
      }}
      onClick = {handleClick} 
      >{_key.label[accedental]}</div>  

    {/* Interval Indicator */}
    <div
      className = {`absolute br-pill flex justify-center items-center b`}
      style = {{
        backgroundColor: "transparent",
        color: "white",
        width: "250%",
        height: "250%",
        bottom: "250%",
        left: "250%",
        transform: `rotate(${45 - 30 * position}deg`,
        userSelect: "none",
      }}
      >{interval}</div>  
  </div>
  )
}

const Circ = props => {
  const {size,color,classes} = props;
  return (<div 
    className = {`br-pill ${classes}`}
    style = {{
      backgroundColor: color,
      width: size,
      height: size,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      transition: ".2s"
    }}  
    />)
}
  


//###########################################

const CircleOfFifths = props => {
  const { model: {base, mode,accedental,scale}, setBase } = props;

  const keySignatureTonic = KEYMAP[( 7* (base - MODEINDEX[mode]*2%7 + 1) ).mod(12) ].label[accedental]
  
  
  const sliceArray = [...Array(12).keys()];
  return(
    <div className = "circle-container shadow-1">    

    {[

      // 12 slices of the circle
      ...sliceArray.map( _i => {
        const _key = KEYMAP[(7*_i)%12];

        //Check whether the scale includes a Cb and then conditionally change the display from B to Cb
        const localAccedental = scale.includes("Cb") && _key.id === 11 ? "6b" : accedental;
          
        const options = _i === base ? 
          {
            background:`shadow-1`,
            keyDisplay: "ba bw3 b--white",
            interval: INTERVALS[mode][(_i - base + MODEINDEX[mode]*2%7).mod(12)],
          } 
          : scale.includes(_key.label[localAccedental]) ?
          {
            background:`o-70`,
            keyDisplay: "",
            interval: INTERVALS[mode][(_i - base + MODEINDEX[mode]*2%7).mod(12)],
          } 
          : 
          {
            background:`o-0`,
            keyDisplay: "",
            interval: "",
          };

          return <Slice 
            key = {"slice_"+_i} 
            position = {_i} 
            _key = {_key}
            accedental = {localAccedental} 
            options = {options}
            handleClick = { _ => setBase(_i) }
          /> 

        }),

        // Center and Key Signature
        <Circ key = "centerCirc1" size = "40%" color = {`${KEYMAP[( 7*base ) % 12].primary}`} classes = ""/>,
        <Circ key = "centerCirc2" size = "35%" color = "white" classes = "o-80"/>,
        <KeySignature key = "keySignature" tonic = {keySignatureTonic}/>,
      ]}        
    </div>
  )
}

export default CircleOfFifths;