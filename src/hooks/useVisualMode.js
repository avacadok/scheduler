import { useState } from "react";

export const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setHistory(prev =>
        [...prev.slice(0, -1), newMode]
      )
    } else {
      setHistory(prev =>
        [...prev, newMode]
      )
    }
  };

  const back = function () {
    if (history.length <= 1) {
      return
    }

    setHistory(prev =>
      [...prev.slice(0, -1)])
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
}