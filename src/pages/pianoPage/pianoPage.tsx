import React from "react"
import Piano from "../../components/piano/piano"
import { notes } from "../../data/notes"

export function PianoPage() {
  
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const audio = new Audio(`audio/${e.currentTarget.value}.mp3`)
      audio.play();
    }

    return (
        <>
          <Piano notes={notes} clickHandler={handleClick}/>
        </>
    )
}