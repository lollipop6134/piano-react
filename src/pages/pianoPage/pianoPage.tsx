import { notes } from '../../data/notes';
import { Howl } from 'howler';
import { Piano } from '../../components/piano/piano';

const sounds: { [key: string]: Howl } = {};
notes.forEach((note) => {
  sounds[note] = new Howl({
    src: [`/audio/${note}.mp3`],
    preload: true,
  });
});


export function PianoPage() {

    return (
        <>
          <Piano />
        </>
    )
}