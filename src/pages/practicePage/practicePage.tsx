import React, { useEffect, useState } from "react"
import Piano from "../../components/piano/piano"
import { notes, keyboard } from "../../data/notes"
import { Howl } from "howler";
import './practicePage.css';
import { Link } from "react-router-dom";
import { supabase } from '../../supabaseClient';

const sounds: { [key: string]: Howl } = {};

notes.forEach((note) => {
  sounds[note.note] = new Howl({
    src: `/audio/${note.note}.mp3`,
    preload: true,
  });
});

type Props = {
    id: number;
    practiceNotes: string[];
    practiceImage: string[];
    session: any;
  }

const PracticePage: React.FC<Props> = ({ id, practiceNotes, practiceImage, session }) => {
    const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const [firstRoundComplete, setFirstRoundComplete] = useState(false);
    const lessonNotes = useState(id < 6 ? (() => practiceNotes.sort(() => Math.random() - 0.5)) : practiceNotes)[0];

    const badWords = ['No.', 'Try again!', 'Eww...', 'Bruh.'];
    const goodWords = ["Cool!", "You're so smart!", 'Good!', "Incredible!"];
    const completeImages = ['Capy1', 'Capy2', 'Capy3', 'Capy4', 'Capy5', 'Capy6', 'Capy7'];
    const completeImage = completeImages[Math.floor(Math.random() * completeImages.length)];

    let totalNotes: number;
    if (id < 6) totalNotes = 10;
    else totalNotes = practiceNotes.length;

    async function addToCompletedLessons() {
        const { data, error } = await supabase
        .from('Users')
        .select('completedLessons')
        .eq('email', session.user.email);
      
        if (error) {
            alert(error.message)
        } else {
            const currentCompletedLessons = data?.[0].completedLessons || [];
      
            if (!currentCompletedLessons.includes(id)) {
            const updatedCompletedLessons = [...currentCompletedLessons, id];
            const { error } = await supabase
            .from('Users')
            .update({ completedLessons: updatedCompletedLessons})
            .eq('email', session.user.email)
          
            if (error) {
                alert(error.message)
            }
            }
      }}

    function setCurrentNoteElement(): string {
        if (currentNoteIndex < totalNotes) {
            return "Play this note: " + (lessonNotes[currentNoteIndex])[0] + " of the " + ((lessonNotes[currentNoteIndex].length) >= 2 ? lessonNotes[currentNoteIndex][1] : "minor") + " octave";
        } else {
            return "Lesson complete!";
        }
    };

    useEffect(() => {
        if (currentNoteIndex === totalNotes) {
            if (id < 6) {
                setIsLessonComplete(true);
                addToCompletedLessons();
            } else {
                if (firstRoundComplete) {
                    setIsLessonComplete(true);
                    addToCompletedLessons();
                  } else {
                    setFirstRoundComplete(true);
                    setCurrentNoteIndex(0);
                  }
            }
        }
      }, [currentNoteIndex, firstRoundComplete, lessonNotes]);

    function checkNote(note: string) {
        const currentNote = lessonNotes[currentNoteIndex];
        if (note === currentNote) {
            setCurrentNoteIndex(prevIndex => prevIndex + 1);
            setFeedbackMessage(goodWords[Math.floor(Math.random() * goodWords.length)]);
        } else {
            setFeedbackMessage(badWords[Math.floor(Math.random() * badWords.length)]);
        }
    };

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
        const audio = new Audio(`/audio/${e.currentTarget.value}.mp3`)
        audio.play();
        checkNote(e.currentTarget.value);
    };

    function setImage():string {
        if (!firstRoundComplete)
        {
            return lessonNotes[currentNoteIndex];
        } else {
            return practiceImage[0];
        }
    };

    return (
        <div id="practice">
            {isLessonComplete && <img src={`/images/${completeImage}.webp`} id="completeImage" alt="Cute Capy"/>}
            <div className="container row" id="practiceInfo">
            <div>
                    {id === 1 && <div id="currentNote">{setCurrentNoteElement()}</div>}
                    {id !== 1 && <div className="container row" id="practiceInfoImage">
                    {isLessonComplete ? "Lesson complete!" : firstRoundComplete ? "Let's try together! " : "Play this note: "}
                        {!isLessonComplete && <img alt="current note" src={'/images/'+ setImage()+'.webp'} id="currentNoteImage" />}
                        </div>}
                    <div id="feedback">{feedbackMessage}</div>
                </div>
                {id < 6 && !isLessonComplete && <img src={`/images/${practiceImage}.webp`} id="practiceImage" alt={`practice for ${id} lesson`} />}
            </div>
            {isLessonComplete && <Link to="/lessons" className="main-button" onClick={() => {localStorage.setItem('practiceMode', "false")}}>Lessons</Link>}
            {!isLessonComplete && <Piano notes={notes} clickHandler={handleClick} />}
        </div>
    )
}

export default PracticePage;