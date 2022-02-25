import React from "react"

export default function Die({ die, handleHold }) {
    const style = {
        backgroundColor: die.isHeld ? "#59E391" : "#FFF"
    }

    return (
        <div className="die-box" style={style} onClick={() => handleHold(die.id)}>{die.value}</div>
    )
}