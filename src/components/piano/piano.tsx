import './piano.css';
import { NoteType } from '../../data/notes';
import Note from '../note/note';
import { supabase } from '../../supabaseClient';

type Props = {
  notes: NoteType[];
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Piano: React.FC<Props> = ({ notes, clickHandler }) =>{

    return (
        <>
            <div id="rotate">Please, rotate your phone<img src={supabase.storage.from("images").getPublicUrl(`RotatePhone.png`).data.publicUrl} /></div>
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