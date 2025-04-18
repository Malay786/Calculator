import { evaluate } from "mathjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {

  const [input, setInput] = useState('')

  const buttons = [
    '1', '2', '3', '+',
    '4', '5', '6', '-',
    '7', '8', '9', '*',
    '0', '.', '=', '/'
  ]

  const handleClick = (value) => {
    setInput((prev) => prev + value)
  }

  // eval function returns a Number therefore converting it to string
  const handleEvaluate = () => {
    try {
      if(!input || input.trim() === '') {
        console.log("1")
        setInput('ERROR');
        return;
      }
      const result = evaluate(input);

      if(typeof result === 'undefined' || result === null || isNaN(result)) {
        console.log("2")
        setInput('ERROR');
        return;
      }
      const ans = result.toString();
      console.log("result ", result )
      console.log("ans ", ans);
      setInput(ans);
    } catch (error) {
      setInput('ERROR');
      console.log(error)
    }
  }

  const handleBackspace = () => {
    setInput(prev => prev.slice(0,-1));
  }

  const handleClear = () => {
    setInput('');
  }

  useEffect(() => {

    const handleKeyDown = (e) => {

      const allowedKeys = '0123456789+-*/.';
      if(allowedKeys.includes(e.key)) {
          handleClick(e.key);
          console.log("Pressed key: ", e.key);
      }

      if(e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        handleEvaluate();
        console.log("Pressed Key: ", e.key);
      }

      if(e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      }

      if(e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  return (
    <div>
      <h1 className="text-3xl flex justify-center">Calculator</h1>
      <div className="w-full flex justify-center items-center">
        <div className="w-70 max-w-75 shadow-md p-4 mt-7">
          <input
            className="w-full p-3 mb-3 focus:outline-none border-[1.2px] rounded-lg "
            value={input}
            type="text"
            readOnly
          />
          <div className="grid grid-cols-4 gap-2">
            {
              buttons.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => btn === '='? handleEvaluate() : handleClick(btn)}
                  className="rounded bg-amber-600 hover:bg-amber-700 transition-all duration-300 py-3"
                >
                  {btn}
                </button>
              ))
            }
            <button
              onClick={handleClear}
              className="rounded bg-amber-600 hover:bg-amber-700 py-3"
            >
              AC
            </button>
            <button
              onClick={handleBackspace}
              className="rounded bg-amber-600 hover:bg-amber-700 py-3"
            >
               {'<--'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

