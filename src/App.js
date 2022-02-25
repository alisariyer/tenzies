import React from "react";
import Die from "./Die";

export default function App() {
  function allNewDice() {
    // TIP: [...Array(10).keys()] to create a list [0, 1, ... 10]
    // create an array contains 10 random number 1 to 6 inclusive
    return Array.from('helloworld').map(x => Math.ceil(Math.random() * 6));
  }

  console.log(allNewDice())

  return (
    <main>
      <div className="die-container">
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
        <Die value={0} />
      </div>
    </main>
  );
}
