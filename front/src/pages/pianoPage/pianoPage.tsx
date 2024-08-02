import React, { useEffect, useRef, useState } from "react";
import Piano from "../../components/piano/piano";
import { NoteProps } from "../../components/note/note";
import { useAuth } from "../../UserContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { source } from '../../source';
import i18n from "../../i18n";
import axios from "axios";

export function PianoPage() {
  const [pianoNotes, setPianoNotes] = useState<NoteProps[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isError, setIsError] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(() => Math.floor(Math.random() * (89 - 3 + 1)) + 3);
  const [moving, setMoving] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(() => (Math.random() < 0.5 ? -1 : 1)); // 1 для движения вправо, -1 для движения влево
  const [capyImage, setCapyImage] = useState<string>(() => direction === 1 ? 'CapyWalk-reverse.gif' : 'CapyWalk.gif');

  const instruments = ['Piano', 'Guitar', 'Pulse', 'Square', user && 'mySounds'];

  const [selectedInstrument, setSelectedInstrument] = useState<string>(() => {
    return localStorage.getItem('selectedInstrument') || 'Piano';
  });

  const audioRefs = useRef<HTMLAudioElement[]>([]);

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
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [dataLoaded, pianoNotes, selectedInstrument]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRefs.current.forEach(audio => audio.pause());
        audioRefs.current = [];
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let moveInterval: NodeJS.Timeout;

    const moveCapybara = () => {
      setPosition((prevPosition) => {
        if (prevPosition >= 90) {
          setMoving(false);
          setCapyImage('CapySeat-reverse.png');
          setTimeout(() => {
            setCapyImage('CapySleep-reverse.png');
            setTimeout(() => {
              setMoving(true);
              setDirection(-1); // Изменяем направление движения
              setCapyImage('CapyWalk.gif');
            }, 7000); // Время стояния с третьим изображением
          }, 5000); // Время стояния с вторым изображением
          return 89.9; // Остановка на правом краю
        } else if (prevPosition <= 2) {
          setMoving(false);
          setCapyImage('CapySeat.png');
          setTimeout(() => {
            setCapyImage('CapySleep.png');
            setTimeout(() => {
              setMoving(true);
              setDirection(1); // Изменяем направление движения
              setCapyImage('CapyWalk-reverse.gif');
            }, 7000); // Время стояния с третьим изображением
          }, 5000); // Время стояния с вторым изображением
          return 2.1; // Остановка на левом краю
        }
        return prevPosition + (moving ? direction : 0); // Движение капибары
      });
    };

    if (moving) {
      moveInterval = setInterval(moveCapybara, 250); // Частота обновления позиции
    }

    return () => {
      clearInterval(moveInterval);
    };
  }, [moving, direction]); // Добавил зависимость от direction

  const handleKeyPress = (event: KeyboardEvent) => {
    setIsError(false);
    if (event.repeat) return;
    const key = event.key.toUpperCase();
    const noteIndex = pianoNotes.findIndex(note => note.keyboard === key);
    if (noteIndex !== -1) {
      const note = pianoNotes[noteIndex];
      const audioSrc = selectedInstrument !== 'mySounds' ? 
        `/audio/${(note.note).trim()}-${selectedInstrument.toLowerCase()}.mp3` :
        `/audio/users/${(note.note).trim()}_${user?.email}.mp3`;
      const audio = new Audio(audioSrc);
      audioRefs.current.push(audio);
      audio.play().then(() => {
        const keyElement = document.getElementById((note.note).trim());
        if (keyElement) {
          keyElement.classList.add('active');
          setTimeout(() => {
            keyElement.classList.remove('active');
          }, 300);
        }
      }).catch(error => {
        setIsError(true);
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsError(false);
    const audioSrc = selectedInstrument !== 'mySounds' ? 
      `/audio/${(e.currentTarget.value).trim()}-${selectedInstrument.toLowerCase()}.mp3` :
      `/audio/users/${(e.currentTarget.value).trim()}_${user?.email}.mp3`;
    const audio = new Audio(audioSrc);
    audioRefs.current.push(audio);
    audio.play().then(() => {
    }).catch(error => {
      setIsError(true);
    });
  };

  const handleInstrumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInstrument = event.target.value;
    setSelectedInstrument(newInstrument);
    localStorage.setItem('selectedInstrument', newInstrument);
  };

  if (!dataLoaded) {
    return <div id='preloader'> {t('preloader')} <div id='loader'></div></div>
  }

  return (
    <div id="pianoPage">
      <div id="instruments">
        {instruments.map((instrument) => (
          <label key={instrument} style={{ margin: '0 10px' }} id="instrument" className={instrument === selectedInstrument ? 'active' : ''}>
            {t(instrument!)}
            <input
              type="radio"
              value={instrument || ''}
              checked={selectedInstrument === instrument}
              onChange={handleInstrumentChange}
            />
          </label>
        ))}
        {!user && <label id="instrument"><Link style={{color: '#5F2300'}} to='/account'>{t('mySounds')}</Link></label>}
      </div>
      {selectedInstrument === "mySounds" && <button className='main-button' id="uploadNotes"><Link to='/pianoEditor'>{t('upload-notes')}</Link></button>}
      {isError && <div id="errorNote">{t('error-note')}</div>}
      <img src={`/images/${capyImage}`} alt="capy walks" id="CapyWalk" style={{ left: `${position}vw` }} />
      <Piano pianoNotes={pianoNotes} clickHandler={handleClick} />
    </div>
  );
}
