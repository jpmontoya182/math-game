import React, { useEffect, useState } from "react";
import "./App.css";
import NumberId from "./components/numbers/Number";
import Starts from "./components/stars/Starts";
import PlayAgain from "./components/stars/PlayAgain";
import utils from "./components/utils";
import useGameState from './hooks/useGameState'

const Game = (props) => { 
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 
  	? 'won'
    : secondsLeft === 0 ? 'lost' : 'active'

  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame}  gameStatus={gameStatus}/>
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
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StartMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
}

export default StartMatch;
