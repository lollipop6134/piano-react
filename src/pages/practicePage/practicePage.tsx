import React from "react"
import Piano from "../../components/piano/piano"
import { notes } from "../../data/notes"
import { useEffect, useState } from "react";
import { keyboard } from "../../data/notes";
import { Howl } from "howler";
import './practicePage.css';
import { Link } from "react-router-dom";

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
    practiceImage: string;
  }

const PracticePage: React.FC<Props> = ({ id, practiceNotes, practiceImage }) => {
    const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const randomNotes = useState(() => practiceNotes.sort(() => Math.random() - 0.5))[0];

    const badWords = ['No.', 'Try again!', 'Eww...', 'Bruh.'];
    const goodWords = ["Cool!", "You're so smart!", 'Good!', "Incredible!"];
    const completeImages = ['Capy1', 'Capy4', 'Capy8', 'Capy9', 'Capy14', 'Capy15', 'Capy16'];
    const completeImage = completeImages[Math.floor(Math.random() * completeImages.length)];

    function setCurrentNoteElement(): string {
        if (currentNoteIndex < 5) {
            return "Play this note: " + (randomNotes[currentNoteIndex])[0] + " of the " + ((randomNotes[currentNoteIndex].length) >= 2 ? randomNotes[currentNoteIndex][1] : "minor") + " octave";
        } else {
            return "Lesson complete!";
        }
    }

    useEffect(() => {
        if (currentNoteIndex === 5) {
          setIsLessonComplete(true);
        }
      }, [currentNoteIndex]);

    function checkNote(note: string) {
        const currentNote = randomNotes[currentNoteIndex];
        if (note === currentNote) {
            setCurrentNoteIndex(prevIndex => prevIndex + 1);
            setFeedbackMessage(goodWords[Math.floor(Math.random() * goodWords.length)]);
        } else {
            setFeedbackMessage(badWords[Math.floor(Math.random() * badWords.length)]);
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
      }, [currentNoteIndex]);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const audio = new Audio(`/audio/${e.currentTarget.value}.mp3`);
        audio.play();
        checkNote(e.currentTarget.value);
    }
    return (
        <div id="practice">
            {isLessonComplete && <img src={`/images/${completeImage}.jpg`} id="completeImage" alt="Cute Capy"/>}
            <div className="container row" id="practiceInfo">
            <div>
                    {id === 1 && <div id="currentNote">{setCurrentNoteElement()}</div>}
                    {id !== 1 && <div className="container row" id="practiceInfoImage">
                        {isLessonComplete ? "Lesson complete!" : "Play this note: "}
                        {!isLessonComplete && <img alt="current note" src={`/images/${randomNotes[currentNoteIndex]}.jpg`} id="currentNoteImage" />}
                        </div>}
                    <div id="feedback">{feedbackMessage}</div>
                </div>
                {!isLessonComplete && <img src={practiceImage} id="practiceImage" alt={`practice for ${id} lesson`}></img>}
            </div>
            {isLessonComplete && <Link to="/lessons" className="main-button">Lessons</Link>}
            {!isLessonComplete && <Piano notes={notes} clickHandler={handleClick}/>}
        </div>
    )
}

export default PracticePage;