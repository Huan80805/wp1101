import "./ButtonBox.css"
import Button from "./Button"
import { useState } from "react"

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ]
const ButtonBox = (props) => {
    const [refresh, setRefresh] = useState(false)
    const [memory, setMemory] = useState({num:"0", operator:""})
    const calc = props.calc
    const setCalc = props.setCalc
    const btnClassifier = (btn) => {
        if (btn === "C"){ return resetClicked}
        else if (btn === "+-"){ return signClicked}
        else if (btn === "%"){ return percentClicked}
        else if (btn === "="){ return equalClicked}
        else if (btn === "/" || btn === "X" || btn === "-" || btn === "+"){ return operatorClicked}
        else if (btn === "."){ return commaClicked}
        else {return numClicked}
    }
    const calculate = (num1,num2,operator) => {
        if      (operator === "+") {return parseFloat(num1)+parseFloat(num2)}
        else if (operator === "-") {return parseFloat(num1)-parseFloat(num2)}
        else if (operator === "X") {return parseFloat(num1)*parseFloat(num2)}
        else                       {return parseFloat(num1)/parseFloat(num2)}
    }
    const check = (result) => {
        if (result === Infinity || result === -Infinity){
            setCalc({prevInput:0,prevOperator:"",curInput:"錯誤"})
            setMemory({num:"0",operator:""})
            return false
        }
        else {return true}
    }
    const resetClicked = () => {
        setCalc({curInput:"0",prevInput:"0",prevOperator:""})
        setMemory({num:"0",operator:""})
    }

    const signClicked = () => {
        setCalc({...calc,curInput: ((calc.curInput==="0")?"0":-1*calc.curInput)})
    }
    const percentClicked = () => {
        let newNum = "" 
        if (calc.curInput==="0"){newNum="0"}
        else {newNum=calc.curInput/100}    
        setCalc({...calc, curInput:newNum})
    }
    const numClicked = (e) => {
        e.preventDefault()
        const input = e.target.innerHTML
        let num = calc.curInput
        let newNum = ""
        if (refresh !== true){
            if (num === "0" && input === "0"){newNum="0"}
            else if (num === "0"){newNum=input}
            else {newNum=num+input}
        }
        else{
            newNum = input
            setRefresh(false)
        }
        setCalc({...calc, curInput:newNum})
    }

    const operatorClicked = (e) => {
        // store new operator and compute immediately
        e.preventDefault()
        const value = e.target.innerHTML
        let result = "0"
        if (calc.prevOperator !== ""){
            if ((calc.prevOperator === "-" || calc.prevOperator === "+") && (value === "X" || value === "/")){
                setMemory({num:calc.prevInput,operator:calc.prevOperator})
                setCalc({
                    ...calc,
                    prevInput:calc.curInput,
                    prevOperator:value            
                })
            }            
            else{
                if (memory.operator !== "" && (value === "-" || value === "+")){
                        result = calculate(calc.prevInput,calc.curInput,calc.prevOperator)
                        result = calculate(memory.num, result, memory.operator)
                        if (check(result)){
                            setCalc({
                                prevInput:result,
                                curInput:result,
                                prevOperator:value
                            })
                            setMemory({
                                num:"0",
                                operator:""
                            })
                        }                                       
                }
                else{
                    result = calculate(calc.prevInput,calc.curInput,calc.prevOperator)
                    if (check(result)){
                        setCalc({
                            prevInput:result,
                            curInput:result,
                            prevOperator:value            
                        })
                    }
                }                                
            }
            setRefresh(true)
        }
        else{
            setCalc({
                ...calc,
                prevInput:calc.curInput,
                prevOperator:value            
            })
            setRefresh(true)
        }   
      }
    
    const equalClicked = () => {
        let result = "0"
        if (calc.prevOperator !== ""){
            if (memory.operator !== ""){
                result = calculate(calc.prevInput,calc.curInput,calc.prevOperator)
                result = calculate(memory.num,result,memory.operator) 
            }
            else{result = calculate(calc.prevInput,calc.curInput,calc.prevOperator)}
            if (check(result)){
                setCalc({
                    prevInput:"0",
                    curInput:result,
                    prevOperator:""
                })
                setMemory({
                    num:"0",
                    operator:""
                })
            }
            setRefresh(true)
        }
    }

    const commaClicked = (e) => {
        e.preventDefault();
        if (!calc.curInput.includes(".")){
            setCalc({...calc,curInput:calc.curInput+"."})           
        }
      }

    const createButtonBox = () => {
        return(
          btnValues.flat().map((btn, i) => {
          return (
            <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={btnClassifier(btn)}
            />
          )
        }))
      }
    return <div className="buttonBox">{createButtonBox()}</div>
}

export default ButtonBox