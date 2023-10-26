import React from "react"
import Piano from "../../components/piano/piano"
import { notes } from "../../data/notes"
import { useEffect } from "react";
import { keyboard } from "../../data/notes";
import { Howl } from "howler";
import './practicePage.css';

const sounds: { [key: string]: Howl } = {};

notes.forEach((note) => {
  sounds[note.note] = new Howl({
    src: [`/audio/${note.note}.mp3`],
    preload: true,
  });
});

type Props = {
    id: number;
    practiceNotes: string[];
  }

const PracticePage: React.FC<Props> = ({ practiceNotes }) => {

    const randomNotes = practiceNotes.sort(() => Math.random() - 0.5);
    let currentNoteIndex = 0;
    const badWords = ['No.', 'Try again!', 'Eww...', 'Bruh.'];
    const goodWords = ["Cool!", "You're so smart!", 'Good!', "Incredible!"];

    const currentNoteElement = document.getElementById("currentNote");
    const feedbackElement = document.getElementById("feedback");

    function checkNote(note: string) {
        const currentNote = randomNotes[currentNoteIndex];
        if (note === currentNote) {
            if (feedbackElement) {
                feedbackElement.textContent = goodWords.sort(() => Math.random() - 0.5)[0];
            } else {
                console.log("что-то не так(((((((")
            }
            currentNoteIndex++;
            if (currentNoteIndex < 15) {
                if (currentNoteElement) {
                    currentNoteElement.textContent = "Play this note: " + (randomNotes[currentNoteIndex])[0] + " of the " + ((randomNotes[currentNoteIndex].length) >= 2 ? randomNotes[currentNoteIndex][1] : "minor") + " octave";
                }
            } else {
                if (currentNoteElement) {
                    currentNoteElement.textContent = "Lesson complete!";
                }
            }
        }
        else {
            if (feedbackElement)
            {
                feedbackElement.textContent = badWords.sort(() => Math.random() - 0.5)[0];
            }
        }
    }

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
                keyElement.classList.remove('active')
                }, 300);
            }
            }
            checkNote(note.note);
        }
    };
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const audio = new Audio(`/audio/${e.currentTarget.value}.mp3`);
        audio.play();
        checkNote(e.currentTarget.value);
    }

    return (
        <div id="practice">
            <div id="currentNote">Play this note: {randomNotes[currentNoteIndex][0]} of the {(randomNotes[currentNoteIndex].length) >= 2 ? randomNotes[currentNoteIndex][1] : "minor"} octave</div>
            <div id="feedback"></div>
            <Piano notes={notes} clickHandler={handleClick}/>
        </div>
    )
}

export default PracticePage