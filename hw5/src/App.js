import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import React, { useState } from "react";

import "./App.css";

function App() {
  let [calc, setCalc] = useState({
    prevInput:0,
    curInput:"0",
    prevOperator:""
  })
  return (
    <div className="app">
      <Screen value={calc.curInput} />
      <ButtonBox calc={calc} setCalc={setCalc} />
    </div>
  );
}

export default App;
