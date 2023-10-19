import './piano.css';
import { notes, keyboard } from '../../data/notes';
import { Howl } from 'howler';
import { useEffect } from 'react';

const sounds: { [key: string]: Howl } = {};

notes.forEach((note) => {
  sounds[note] = new Howl({
    src: [`/audio/${note}.mp3`],
    preload: true,
  });
});


export function Piano() {

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return;
        const key = event.key.toUpperCase();
        const noteIndex = keyboard.indexOf(key);
        if (noteIndex !== -1) {
          const note = notes[noteIndex];
          const sound = sounds[note];
          if (sound) {
            sound.play();
            const keyElement = document.getElementById(note);
            if (keyElement) {
              keyElement.classList.add('active');
              setTimeout(() => {
                keyElement.classList.remove('active');
              }, 300);
            }
          }
        }
      };

      const handleNoteClick = (note: string) => {
        const sound = sounds[note];
        if (sound) {
          sound.play();
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
                <div className='key white' onClick={() => handleNoteClick('C')} id='C'>Q</div>
                <div className='key black' onClick={() => handleNoteClick('CSharp')} style={{'left': '3.2vmax'}} id='CSharp'>2</div>
                <div className='key white' onClick={() => handleNoteClick('D')} id='D'>W</div>
                <div className='key black' onClick={() => handleNoteClick('DSharp')} style={{'left': '7.95vmax'}} id='DSharp'>3</div>
                <div className='key white' onClick={() => handleNoteClick('E')} id='E'>E</div>
                <div className='key white' onClick={() => handleNoteClick('F')} id='F'>R</div>
                <div className='key black' onClick={() => handleNoteClick('FSharp')} style={{'left': '17.05vmax'}} id='FSharp'>5</div>
                <div className='key white' onClick={() => handleNoteClick('G')} id='G'>T</div>
                <div className='key black' onClick={() => handleNoteClick('GSharp')} style={{'left': '21.5vmax'}} id='GSharp'>6</div>
                <div className='key white' onClick={() => handleNoteClick('A')} id='A'>Y</div>
                <div className='key black' onClick={() => handleNoteClick('ASharp')} style={{'left': '26vmax'}} id='ASharp'>7</div>
                <div className='key white' onClick={() => handleNoteClick('B')} id='B'>U</div>
                <div className='key white' onClick={() => handleNoteClick('C2')} id='C2'>I</div>
                <div className='key black' onClick={() => handleNoteClick('CSharp2')} style={{'left': '35vmax'}} id='CSharp2'>9</div>
                <div className='key white' onClick={() => handleNoteClick('D2')} id='D2'>O</div>
                <div className='key black' onClick={() => handleNoteClick('DSharp2')} style={{'left': '39.5vmax'}} id='DSharp2'>0</div>
                <div className='key white' onClick={() => handleNoteClick('E2')} id='E2'>P</div>
                <div className='key white' onClick={() => handleNoteClick('F2')} id='F2'>[</div>
                <div className='key black' onClick={() => handleNoteClick('FSharp2')} style={{'left': '48.8vmax'}} id='FSharp2'>=</div>
                <div className='key white' onClick={() => handleNoteClick('G2')} id='G2'>]</div>
                <div className='key black' onClick={() => handleNoteClick('GSharp2')} style={{'left': '53.2vmax'}} id='GSharp2'>A</div>
                <div className='key white' onClick={() => handleNoteClick('A2')} id='A2'>Z</div>
                <div className='key black' onClick={() => handleNoteClick('ASharp2')} style={{'left': '57.8vmax'}} id='ASharp2'>S</div>
                <div className='key white' onClick={() => handleNoteClick('B2')} id='B2'>X</div>
                <div className='key white' onClick={() => handleNoteClick('C3')} id='C3'>C</div>
                <div className='key black' onClick={() => handleNoteClick('CSharp3')} style={{'left': '66.9vmax'}} id='CSharp3'>F</div>
                <div className='key white' onClick={() => handleNoteClick('D3')} id='D3'>V</div>
                <div className='key black' onClick={() => handleNoteClick('DSharp3')} style={{'left': '71.3vmax'}} id='DSharp3'>G</div>
                <div className='key white' onClick={() => handleNoteClick('E3')} id='E3'>B</div>
                <div className='key white' onClick={() => handleNoteClick('F3')} id='F3'>N</div>
                <div className='key black' onClick={() => handleNoteClick('FSharp3')} style={{'left': '80.4vmax'}} id='FSharp3'>J</div>
                <div className='key white' onClick={() => handleNoteClick('G3')} id='G3'>M</div>
                <div className='key black' onClick={() => handleNoteClick('GSharp3')} style={{'left': '85vmax'}} id='GSharp3'>K</div>
                <div className='key white' onClick={() => handleNoteClick('A3')} id='A3'>,</div>
                <div className='key black' onClick={() => handleNoteClick('ASharp3')} style={{'left': '89.5vmax'}} id='ASharp3'>L</div>
                <div className='key white' onClick={() => handleNoteClick('B3')} id='B3'>.</div>
                <div className='key white' onClick={() => handleNoteClick('C4')} id='C4'>/</div>
                <div className='key black' onClick={() => handleNoteClick('CSharp4')} style={{'left': '98.4vmax'}} id='CSharp4'>;</div>
            </div>
        </>
    )
}