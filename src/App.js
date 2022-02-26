import React, { useState , useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    console.log("Dice state has changed");
  }, [dice])

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
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.isHeld ? dice : generateNewDie();
      })
    );
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
      <section>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </section>
      <div className="die-container">{diceElements}</div>
      <button className="btn-roll" type="button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
