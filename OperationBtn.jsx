import React from "react";
import { action } from "./Calc";

const OperationBtn = ({dispatch,operation})=>{
    return <button onClick={()=> dispatch({type:action.choose_operation, payload:{operation}})}>{operation}</button>
}

export default OperationBtn;