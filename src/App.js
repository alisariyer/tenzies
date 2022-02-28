import React, { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti, { ReactConfetti } from "react-confetti";

export default function App() {

  // set a dice state to keep 10 Die object created by generateNewDie function
  const [dice, setDice] = useState(() => allNewDice());

  // set a tenzies state to check if the user win or not
  const [tenzies, setTenzies] = useState(false);

  // set a counter state to count each click on roll button
  // with purpose of the save the best score in localStorage
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // check if all die is hold and all die value is same
    const isWin = dice.every(
      (die) => die.isHeld && die.value === dice[0].value
    );
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
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
      setCounter(0)
    } else {
      setDice((prevDice) =>
        prevDice.map((dice) => {
          return dice.isHeld ? dice : generateNewDie();
        })
      );
      setCounter(counter + 1)
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
        { counter ? 
          <p className="instructions">Counter: {counter}</p> : 
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>}
      </section>
      <div className="die-container">{diceElements}</div>
      <button className="btn-roll" type="button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
