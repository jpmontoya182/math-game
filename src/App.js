import React, { useState } from "react";
import "./App.css";
import NumberId from "./components/numbers/Number";
import Starts from "./components/stars/Starts";
import utils from "./components/utils";

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

const App = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [state, setstate] = useState(initialState)

  
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <Starts stars={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map((numberId) => (
            <NumberId numberId={numberId} key={numberId} />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default App;
