import React, { useReducer } from "react";
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";
import "./calc.css";

const action = {
    add_digit: "add-digit",
    choose_operation: "choose-operation",
    clear: "clear",
    delete_digit: "del-digit",
    evaluate: "evaluate"
}



const Reducer = (state, { type, payload }) => {
    switch (type) {
        case action.add_digit:
            if (state.overwrite) {
                return {
                    ...state,
                    curOp: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === "0" && state.curOp === "0") { return state; }
            if (payload.digit === "." && state.curOp.includes(".")) { return state; }
            return {
                ...state,
                curOp: `${state.curOp || ""}${payload.digit}`
            }
        case action.delete_digit:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite:false,
                    curOp:null
                }
            }
            if(state.curOp == null) return state
            if(state.curOp.length ===1){
                return{
                    ...state,
                    curOp:null
                }
            }
            return{
                ...state,
                curOp:state.curOp.slice(0,-1)
            }
        case action.choose_operation:
            if (state.curOp == null && state.prevOp == null) { return state; }
            if (state.curOp == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            if (state.prevOp == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    prevOp: state.curOp,
                    curOp: null
                }
            }
            return {
                ...state,
                prevOp: evaluate(state),
                operation: payload.operation,
                curOp: null,
            }
        case action.evaluate:
            if (state.operation == null || state.curOp == null || state.prevOp == null) { return state }
            return {
                ...state,
                overwrite: true,
                prevOp: null,
                operation: null,
                curOp: evaluate(state)
            }
        case action.clear:
            return {}
    }
}

const evaluate = ({ curOp, prevOp, operation }) => {
    const prev = parseFloat(prevOp)
    const cur = parseFloat(curOp)
    if (isNaN(prev) || isNaN(cur)) return ""
    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + cur
            break
        case "-":
            computation = prev - cur
            break
        case "*":
            computation = prev * cur
            break
        case "/":
            computation = prev / cur
            break
    }
    return computation.toString();
}

const intFormater = new Intl.NumberFormat("en-us",{
    minimumFractionDigits:0,
})
function formateOperand(operand){
    if(operand==null)return 
    const [integer,decimal]=operand.split('.')
    if(decimal==null) return intFormater.format(integer)
    return `${intFormater.format(integer)}.${decimal}`
}

const Calc = () => {
    const [{ curOp, prevOp, operation }, dispatch] = useReducer(Reducer, {});
    return (
        <>
            <div className="calc-grid">
                <div className="output">
                    <div className="prev-oparand">{formateOperand(prevOp)} {operation}</div>
                    <div className="cur-oparand">{formateOperand(curOp)}</div>
                </div>
                <button className="span-two" onClick={() => dispatch({ type: action.clear })}>AC</button>
                <button onClick={() => dispatch({ type: action.delete_digit })}>DEL</button>
                <OperationBtn operation="/" dispatch={dispatch} />
                <DigitBtn digit="1" dispatch={dispatch} />
                <DigitBtn digit="2" dispatch={dispatch} />
                <DigitBtn digit="3" dispatch={dispatch} />
                <OperationBtn operation="*" dispatch={dispatch} />
                <DigitBtn digit="4" dispatch={dispatch} />
                <DigitBtn digit="5" dispatch={dispatch} />
                <DigitBtn digit="6" dispatch={dispatch} />
                <OperationBtn operation="+" dispatch={dispatch} />
                <DigitBtn digit="7" dispatch={dispatch} />
                <DigitBtn digit="8" dispatch={dispatch} />
                <DigitBtn digit="9" dispatch={dispatch} />
                <OperationBtn operation="-" dispatch={dispatch} />
                <DigitBtn digit="." dispatch={dispatch} />
                <DigitBtn digit="0" dispatch={dispatch} />
                <button className="span-two" onClick={() => dispatch({ type: action.evaluate })}>=</button>
            </div>
        </>
    );
}

export default Calc;
export { action };