import { useState } from "react"

export const useVisualMode = (initial) => {
  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    //setMode(newMode);
    const newHistory = [...history];

    if (replace) {
      newHistory.pop();
    }
      newHistory.push(newMode);
      setHistory(newHistory)

  };

  const back = function(){
    if(history.length <= 1){
      return
    }
    //setMode(history[history.length-2])
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
}