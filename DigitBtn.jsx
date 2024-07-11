import React from "react";
import { action } from "./Calc";

const DigitBtn = ({dispatch,digit})=>{
    return <button onClick={()=> dispatch({type:action.add_digit, payload:{digit}})}>{digit}</button>
}

export default DigitBtn;