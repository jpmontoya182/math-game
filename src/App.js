import React, { useState } from "react";
import "./App.css";
import NumberId from "./components/numbers/Number";
import Starts from "./components/stars/Starts";
import PlayAgain from "./components/stars/PlayAgain";
import utils from "./components/utils";

const App = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const isGameDone = availableNums.length === 0;

  const numberStatus = (numberId) => {
    if (!availableNums.includes(numberId)) {
      return "used";
    }
    if (candidateNums.includes(numberId)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (numberId, currentStatus) => {
    if (currentStatus === "used") {
      return;
    }
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(numberId)
        : candidateNums.filter((cn) => cn !== numberId);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.random(1, 9));
    setCandidateNums([]);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {isGameDone ? (
            <PlayAgain onClick={resetGame} />
          ) : (
            <Starts stars={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((numberId) => (
            <NumberId
              numberId={numberId}
              key={numberId}
              status={numberStatus(numberId)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default App;
