import React, { useState } from "react";
import Die from "./Die";

export default function App() {
  function allNewDice() {
    // TIP: [...Array(10).keys()] to create a list [0, 1, ... 10]
    // create an array contains 10 random number 1 to 6 inclusive
    return Array.from('helloworld').map(x => Math.ceil(Math.random() * 6));
  }

  const [dice, setDice] = useState(() => allNewDice());

  const diceElements = dice.map((die, index) => <Die key={index} value={die} />);

  function rollDice() {
      setDice(allNewDice());
  }

  return (
    <main>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="btn-roll" type="button" onClick={rollDice}>Roll Dice</button>
    </main>
  );
}
