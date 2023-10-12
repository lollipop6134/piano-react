import './piano.css';
import { notes } from '../../data/notes';
import { keyboard } from '../../data/notes';

export function Piano() {
    return (
        <>
            <div id="rotate">Please, rotate your phone<img src="/images/RotatePhone.png" alt="rotate phone" /></div>
            <div id="piano">
                <div className='key white' data-note="C">Q</div>
                <div className='key black' data-note="CSharp" style={{'left': '3.2vmax'}}>2</div>
                <div className='key white' data-note="D">W</div>
                <div className='key black' data-note="DSharp" style={{'left': '7.95vmax'}}>3</div>
                <div className='key white' data-note="E">E</div>
                <div className='key white' data-note="F">R</div>
                <div className='key black' data-note="FSharp" style={{'left': '17.05vmax'}}>5</div>
                <div className='key white' data-note="G">T</div>
                <div className='key black' data-note="GSharp" style={{'left': '21.5vmax'}}>6</div>
                <div className='key white' data-note="A">Y</div>
                <div className='key black' data-note="ASharp" style={{'left': '26vmax'}}>7</div>
                <div className='key white' data-note="B">U</div>
                <div className='key white' data-note="C2">I</div>
                <div className='key black' data-note="CSharp2" style={{'left': '35vmax'}}>9</div>
                <div className='key white' data-note="D2">O</div>
                <div className='key black' data-note="DSharp2" style={{'left': '39.5vmax'}}>0</div>
                <div className='key white' data-note="E2">P</div>
                <div className='key white' data-note="F2">[</div>
                <div className='key black' data-note="FSharp2" style={{'left': '48.8vmax'}}>=</div>
                <div className='key white' data-note="G2">]</div>
                <div className='key black' data-note="GSharp2" style={{'left': '53.2vmax'}}>A</div>
                <div className='key white' data-note="A2">Z</div>
                <div className='key black' data-note="ASharp2" style={{'left': '57.8vmax'}}>S</div>
                <div className='key white' data-note="B2">X</div>
                <div className='key white' data-note="C3">C</div>
                <div className='key black' data-note="CSharp3" style={{'left': '66.9vmax'}}>F</div>
                <div className='key white' data-note="D3">V</div>
                <div className='key black' data-note="DSharp3" style={{'left': '71.3vmax'}}>G</div>
                <div className='key white' data-note="E3">B</div>
                <div className='key white' data-note="F3">N</div>
                <div className='key black' data-note="FSharp3" style={{'left': '80.4vmax'}}>J</div>
                <div className='key white' data-note="G3">M</div>
                <div className='key black' data-note="GSharp3" style={{'left': '85vmax'}}>K</div>
                <div className='key white' data-note="A3">,</div>
                <div className='key black' data-note="ASharp3" style={{'left': '89.5vmax'}}>L</div>
                <div className='key white' data-note="B3">.</div>
                <div className='key white' data-note="C4">/</div>
                <div className='key black' data-note="CSharp4" style={{'left': '98.4vmax'}}>;</div>
            </div>
        </>
    )
}

const keys = document.querySelectorAll('.key');

window.addEventListener('keydown', event => {
    if (event.repeat) return;
    const key = event.key;
    const index = keyboard.indexOf(key.toUpperCase());
    if (index !== -1)
    {
        const note = notes[index];
        playNote(note);
    }
  });

function playNote(note: string) {
    const audio = new Audio(`/audio/${note}.mp3`);
    audio.play();
    const key = document.querySelector(`.key[data-note="${note}"]`);
    if (key !== null)
    {
        key.classList.add('active')
        setTimeout(() => key.classList.remove('active'), 250);
    }
    }

keys.forEach(key => {
    key.addEventListener('click', () => {
      const note = (key as HTMLElement).dataset.note;
      if (note) playNote(note);
    });
});
