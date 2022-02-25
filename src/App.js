import React, { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {

  function allNewDice() {
    // TIP: [...Array(10).keys()] to create a list [0, 1, ... 10]
    // create an array of object to keep 10 random numbers and held status
    return Array.from('helloworld').map(x => ({ 
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }));
  }

  const [dice, setDice] = useState(() => allNewDice());

  const diceElements = dice.map((die, index) => <Die key={index} die={die} handleHeld={handleHeld}/>);

  function rollDice() {
      setDice(allNewDice());
  }

  function handleHeld(id) {
      setDice(prevDice => {
          return prevDice.map(dice => {
              if (dice.id === id) {
                  return {
                      ...dice,
                      isHeld: !dice.isHeld
                  }
              }
              return dice;
          })
      })
  }

  return (
    <main>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="btn-roll" type="button" onClick={rollDice}>Roll</button>
    </main>
  );
}
