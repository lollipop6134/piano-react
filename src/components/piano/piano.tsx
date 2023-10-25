import './piano.css';
import { notes, keyboard, NoteType } from '../../data/notes';
import { Howl } from 'howler';
import React, { useEffect } from 'react';
import Note from '../note/note';

const sounds: { [key: string]: Howl } = {};

notes.forEach((note) => {
  sounds[note.note] = new Howl({
    src: [`/audio/${note.note}.mp3`],
    preload: true,
  });
});


type Props = {
  notes: NoteType[];
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Piano: React.FC<Props> = ({ notes, clickHandler }) =>{

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

    return (
        <>
            <div id="rotate">Please, rotate your phone<img src="/images/RotatePhone.png" alt="rotate phone" /></div>
            <div id="piano">
                {notes.map((element: NoteType) => (
                  <Note
                    id={element.note}
                    key={element.note}
                    color={element.color}
                    note={element.note}
                    clickHandler={clickHandler}
                    keyboard={element.key}
                  />
                ))}
            </div>
        </>
    )
}

export default Piano;