import React from "react";
import Die from "./Die";

export default function App() {
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
