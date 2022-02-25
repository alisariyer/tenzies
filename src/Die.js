import React from "react"

export default function Die({ die, handleHeld }) {
    const style = {
        backgroundColor: die.isHeld ? "#59E391" : "#FFF"
    }
    console.log(die);
    return (
        <div className="die-box" style={style} onClick={() => handleHeld(die.id)}>{die.value}</div>
    )
}