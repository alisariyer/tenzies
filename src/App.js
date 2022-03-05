import React, { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // set a dice state to keep 10 Die object created by generateNewDie function
  const [dice, setDice] = useState(() => allNewDice());

  // set a tenzies state to check if the user win or not
  const [tenzies, setTenzies] = useState(false);

  // set a lap state to count each click, lap time, and overall time for roll button
  // with purpose of the save the best score in localStorage
  const [lap, setLap] = useState(() => getNewLap());

  // get get score if exist from localStorage
  const [bestScore, setBestScore] = useState(() =>
    JSON.parse(localStorage.getItem("bestScore")) || null);

  // check if the user pass the best score
  const [isBestScore, setIsBestScore] = useState(false);

  function getNewLap() {
    const time = new Date().getTime();
    return {
      lap: 0,
      prevClickTime: time,
      lapsTime: 0,
      overallTime: 0,
    };
  }

  useEffect(() => {
    // check if all die is hold and all die value is same
    const isWin = dice.every(
      (die) => die.isHeld && die.value === dice[0].value
    );

    // if the user has won
    if (isWin) {

      // if any bestScore exists in localStorage
      if (bestScore) {

        // if current total time is smaller than bestScore time
        if (lap.overallTime < bestScore.overallTime) {
          setBestScore({
            lap: lap.lap,
            overallTime: lap.overallTime,
          });
          localStorage.setItem('bestScore', JSON.stringify({lap: lap.lap, overallTime: lap.overallTime}))
          setIsBestScore(true);
        } else {
          setIsBestScore(false);
        }

      // if there is no best score in localStorage set current as a best
      } else {
        localStorage.setItem('bestScore', JSON.stringify({ lap: lap.lap, overallTime: lap.overallTime}))
      }
    }
    setTenzies(isWin);
  }, [dice]);

  // helper function
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    // TIP: [...Array(10).keys()] to create a list [0, 1, ... 10]
    // create an array of object to keep 10 random numbers and held status
    return Array.from("helloworld").map((x) => generateNewDie());
  }

  const diceElements = dice.map((die, index) => (
    <Die key={index} die={die} handleHold={handleHold} />
  ));

  function rollDice() {
    // If the game is finished
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
      setLap(getNewLap());
    } else {
      setDice((prevDice) =>
        prevDice.map((dice) => {
          return dice.isHeld ? dice : generateNewDie();
        })
      );
      setLap((prevLap) => {
        console.log("setLap has ran");
        const currentTime = new Date().getTime();
        console.log(currentTime);
        console.log(prevLap);
        return {
          lap: prevLap.lap + 1,
          prevClickTime: currentTime,
          lapsTime: currentTime - prevLap.prevClickTime,
          overallTime:
            prevLap.overallTime + (currentTime - prevLap.prevClickTime),
        };
      });
    }
  }

  function handleHold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  return (
    <main>
      {tenzies && (
        <div className="confetti">
          <Confetti width={400} height={400} />
        </div>
      )}
      <section>
        <h1 className="title">Tenzies</h1>
        {lap.lap ? (
          <table className="lap-table">
            <thead>
              <tr>
                <th>Lap</th>
                <th>Laps Time</th>
                <th>Overall Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{lap.lap}</td>
                <td>{(lap.lapsTime / 1000).toFixed(2)}s</td>
                <td>{(lap.overallTime / 1000).toFixed(2)}s</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        )}
      </section>
      <div className="die-container">{diceElements}</div>
      <button className="btn-roll" type="button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
