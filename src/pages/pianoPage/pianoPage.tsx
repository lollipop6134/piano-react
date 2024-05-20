import React, { useEffect, useState } from "react";
import Piano from "../../components/piano/piano";
import { NoteProps } from "../../components/note/note";

export function PianoPage() {
  const [pianoNotes, setPianoNotes] = useState<NoteProps[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const instruments = ['piano', 'guitar', 'option3', 'option4', 'option5'];

  const [selectedInstrument, setSelectedInstrument] = useState<string>(() => {
    return localStorage.getItem('selectedInstrument') || 'piano';
  });

  useEffect(() => {
    fetch('http://localhost:3001/notes')
      .then(response => response.json())
      .then(data => {
        setPianoNotes(data as NoteProps[]);
        setDataLoaded(true);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('keyup', handleKeyUp)
      };
    }
  }, [dataLoaded, pianoNotes, selectedInstrument]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.repeat) return;
    const key = event.key.toUpperCase();
    const noteIndex = pianoNotes.findIndex(note => note.keyboard === key);
    if (noteIndex !== -1) {
      const note = pianoNotes[noteIndex];
      const audio = new Audio(`/audio/${(note.note).trim()}-${selectedInstrument}.mp3`);
      if (audio) {
        audio.play();
        const keyElement = document.getElementById((note.note).trim());
        if (keyElement) {
          keyElement.classList.add('active');
        }
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    const noteIndex = pianoNotes.findIndex(note => note.keyboard === key);
    if (noteIndex !== -1) {
      const note = pianoNotes[noteIndex];
        const keyElement = document.getElementById((note.note).trim());
        if (keyElement) {
          keyElement.classList.remove('active');
        }
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const audio = new Audio(`/audio/${(e.currentTarget.value).trim()}-${selectedInstrument}.mp3`);
    console.log(audio);
    audio.play();
  };

  const handleInstrumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInstrument = event.target.value;
    setSelectedInstrument(newInstrument);
    localStorage.setItem('selectedInstrument', newInstrument);
  };

  return (
    <>
      <div>
        {instruments.map((instrument) => (
          <label key={instrument} style={{ margin: '0 10px' }}>
            {instrument}
            <input
              type="radio"
              value={instrument}
              checked={selectedInstrument === instrument}
              onChange={handleInstrumentChange}
            />
          </label>
        ))}
      </div>
      <Piano pianoNotes={pianoNotes} clickHandler={handleClick} />
    </>
  );
}
