import React from "react"
import Piano from "../../components/piano/piano"
import { notes } from "../../data/notes"
import { useEffect } from "react";
import { keyboard } from "../../data/notes";
import { Howl } from "howler";

const sounds: { [key: string]: Howl } = {};

notes.forEach((note) => {
  sounds[note.note] = new Howl({
    src: [`/audio/${note.note}.mp3`],
    preload: true,
  });
});

export function PianoPage() {

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.repeat) return;
      const key = event.key.toUpperCase();
      const noteIndex = keyboard.indexOf(key);
      if (noteIndex !== -1) {
        const note = notes[noteIndex];
        const sound = sounds[note.note];
        if (sound) {
          sound.play();
          const keyElement = document.getElementById(note.note);
          if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => {
              keyElement.classList.remove('active');
            }, 300);
          }
        }
      }
    };
  
    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
  
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);
  
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