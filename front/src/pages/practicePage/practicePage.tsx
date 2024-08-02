import React, { useEffect, useState } from "react"
import Piano from "../../components/piano/piano"
import './practicePage.css';
import { Link } from "react-router-dom";
import { NoteProps } from "../../components/note/note";
import axios from "axios";
import { useAuth } from "../../UserContext";
import { useTranslation } from "react-i18next";
import {source} from '../../source';
import i18n from "../../i18n";

type PracticeProps = {
    id: number;
    practiceNotes: string[];
    practiceImage: string;
    times_repeat: number;
    isRandomNotes: boolean;
    isHint: boolean;
    hintImage: string;
  }

const PracticePage: React.FC<PracticeProps> = ({ id, practiceNotes, practiceImage, times_repeat, isRandomNotes, isHint, hintImage }) => {
  const { user } = useAuth();
    const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const [firstRoundComplete, setFirstRoundComplete] = useState(false);
    const lessonNotes = useState(isRandomNotes ? (() => practiceNotes.sort(() => Math.random() - 0.5)) : practiceNotes)[0];
    const { t } = useTranslation();

    const badWords = [t('no'), t('try-again'), t('ew'), t('bruh')];
    const goodWords = [t('cool'), t('so-smart'), t('good'), t('incredible')];
    const completeImages = ['Capy1', 'Capy2', 'Capy3', 'Capy4', 'Capy5', 'Capy6', 'Capy7'];
    const completeImage = completeImages[Math.floor(Math.random() * completeImages.length)];

    let totalNotes: number;
    if (isRandomNotes) totalNotes = times_repeat;
    else totalNotes = practiceNotes.length;

    const [pianoNotes, setPianoNotes] = useState<NoteProps[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
      const lang = i18n.language;
      axios.get(`${source}/notes`, { params: { lang } })
        .then(response => response.data)
        .then(data => {
          setPianoNotes(data as NoteProps[]);
          setDataLoaded(true);
        })
        .catch(error => console.error('Error:', error));
    }, []);
  
    useEffect(() => {
      if (dataLoaded) {
        window.addEventListener('keydown', handleKeyPress); //навесили обработчик событий
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }
    }, [dataLoaded, pianoNotes]);

    const addToCompletedLessons = async () => {
      if (!user?.completedlessons.includes(id)) {
        user?.completedlessons.push(id);
      }
      if (user) {
        const userId = user?.user_id;
        try {
          const response = await axios.post(`${source}/completeLesson`, { userId, "lessonId": id });
          return response.status;
        } catch (error) {
          console.error('Cannot update completed lessons', error);
        }
      }
    };
    
    function setCurrentNoteElement(): string {
        if (currentNoteIndex < totalNotes) {
            return t('play-note') + t((lessonNotes[currentNoteIndex])[0]) + t('of-the') + ((lessonNotes[currentNoteIndex].length) >= 2 ? lessonNotes[currentNoteIndex][1] : t('minor')) + t('octave');
        } else {
            return t('lesson-complete');
        }
    };

    useEffect(() => {
        if (currentNoteIndex === totalNotes) {
            if (isRandomNotes) {
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
      const noteIndex = pianoNotes.findIndex(note => note.keyboard === key);
      if (noteIndex !== -1) {
        const note = pianoNotes[noteIndex];
        checkNote(note.note.trim())
        const audio = new Audio(`/audio/${(note.note).trim()}-piano.mp3`);
        if (audio) {
          audio.play();
          const keyElement = document.getElementById((note.note).trim());
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
      }, [currentNoteIndex]);
    
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const audio = new Audio(`/audio/${(e.currentTarget.value).trim()}-piano.mp3`)
        audio.play();
        checkNote((e.currentTarget.value).trim())
      }

    function setImage():string {
        if (!firstRoundComplete)
        {
            return lessonNotes[currentNoteIndex]+'.webp';
        } else {
            return practiceImage;
        }
    };
    
    return (
        <div id="practice">
            {isLessonComplete && <img src={`/images/${completeImage}.webp`} id="completeImage" alt="Cute Capy"/>}
            <div className="container row" id="practiceInfo">
            <div>
                    {id === 1 && <div id="currentNote">{setCurrentNoteElement()}</div>}
                    {id !== 1 && <div className="container row" id="practiceInfoImage">
                    {isLessonComplete ? t('lesson-complete') : firstRoundComplete ? t('try-together') : t('play-note')}
                        {!isLessonComplete && <img alt="current note" src={'/images/'+ setImage()} id="currentNoteImage" />}
                        </div>}
                    <div id="feedback">{feedbackMessage}</div>
                </div>
                {isHint && !isLessonComplete && <img src={`/images/${hintImage}`} id="practiceImage" alt={`hint for ${id} lesson`} />}
            </div>
            {isLessonComplete && <Link to="/lessons" className="main-button" onClick={() => {localStorage.setItem('practiceMode', "false")}}>{t('lessons')}</Link>}
            {!isLessonComplete && <Piano pianoNotes={pianoNotes!} clickHandler={handleClick} />}
        </div>
    )
}

export default PracticePage;