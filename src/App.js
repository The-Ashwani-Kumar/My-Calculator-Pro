import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Keypad from './components/Keypad/Keypad';

import moon from './assets/moon.png';
import sun from './assets/sun.png';

import './App.css';

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109, 219, 221,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];


function App() {

  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("Calculator-app-mode")) || false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("Calculator-app-history")) || []);

  const keyPress = (keyCode, key) => {
    if (keyCode === 46) {
      setExpression("");
      console.log("Clear");
      return;
    }
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;
    if (numbers.includes(key)) {
      if (key === "0" && !expression) return;
      calculateResult(expression + key);
      setExpression(expression + key);
      console.log("Number");
    }
    else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (lastChar === ".") return;
      if (operators.includes(lastChar)) {
        const editedText = expression.slice(0, -1);
        setExpression(editedText + key);
      }
      else {
        setExpression(expression + key);
      }
      console.log("Operator");
    }
    else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (lastChar === "." || !numbers.includes(lastChar)) return;
      setExpression(expression + key);
    }
    else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0,-1));
      setExpression(expression.slice(0, -1));
      console.log("BackSpace");
    }
    else if (keyCode === 13) {
      calculateResult(expression);

      const hist = [...history];
      if(hist.length > 20)  hist = hist.splice(0,1);
      hist.push(expression);
      setHistory(hist);
      console.log("Enter");
    }
  };

  const calculateResult = (exp) => {
    if (!exp) setResult("Enter something...")
    else if (!numbers.includes(exp.slice(-1))) setResult("Invalid Expression");
    else setResult(eval(exp).toFixed(3) + "");

  }

  useEffect(() => {
      localStorage.setItem("Calculator-app-mode", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("Calculator-app-history", JSON.stringify(history));
}, [history]);
  


  return (
    <div className="app"
      data-theme={isDark ? "dark" : ""}
      tabIndex="0"
      onKeyDown={(event) => keyPress(event.keyCode, event.key)}
    >
      <div className="calculator">
        <div className="calculator-navbar">
          <img onClick={() => setIsDark(!isDark)} src={isDark ? moon : sun} alt="Mode" />
        </div>
        <Header expression={expression} result={result} history={history} />
        <Keypad keyPress={keyPress} />
      </div>
    </div>
  );
}

export default App;
