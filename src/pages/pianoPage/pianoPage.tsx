import React, { useEffect } from "react"
import Piano from "../../components/piano/piano"
import { notes, keyboard } from "../../data/notes"
import { Howl } from "howler";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lxbcgtsajrvcgbuyizck.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmNndHNhanJ2Y2didXlpemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTkwNTcsImV4cCI6MjAxNTA5NTA1N30.Ey3PDIXgcVqGtU1GAWCPMAKuDgLOC7BhtajQ_bHV5NI");


const sounds: { [key: string]: Howl } = {};

notes.forEach((note) => {
  sounds[note.note] = new Howl({
    src: supabase.storage.from("audio").getPublicUrl(`${note.note}.mp3`).data.publicUrl,
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
      const audio = new Audio(supabase.storage.from("audio").getPublicUrl(`${e.currentTarget.value}.mp3`).data.publicUrl)
      audio.play();
    }

    return (
        <>
          <Piano notes={notes} clickHandler={handleClick}/>
        </>
    )
}