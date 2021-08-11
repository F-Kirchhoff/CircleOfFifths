import { KEYMAP } from "./consts";

const keylist = [...Array(12).keys()]

const Navbar = props => {
  const {model: {base,mode,accedental},setBase,setMode} = props;

  return (
    <div className = "Navbar">
      <h2>{"\u{1D106}   \u{1D107}"} </h2>

      <div className = "selector">
        <label>Mode</label>
        <select
          value = {mode}
          onChange = { e => setMode(e.target.value) }
          
          >
          <option value = {"LYDIAN"}>Lydian</option>
          <option selected value = {"IONIAN"} >Ionian (Major)</option>
          <option value = {"MIXOLYDIAN"} >Mixolydian</option>
          <option value = {"DORIAN"} >Dorian</option>
          <option value = {"AEOLIAN"} >Aeolian (Minor)</option>
          <option value = {"PHYRGIAN"} >Phyrgian</option>
          <option value = {"LOCRIAN"} >Locrian</option>
        </select>
      </div>
      
      <div className = "selector">
        <label>Tonic</label>
        <select
          value = {base}
          onChange = { e => setBase(Number(e.target.value)) }
          >
          {keylist.map( _i => <option value = {_i} >{KEYMAP[(7*_i)%12].label[accedental]}</option> )}
          

        </select>
      </div>
    </div>
  )
}


export default Navbar;