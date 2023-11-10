import './piano.css';
import { NoteType } from '../../data/notes';
import Note from '../note/note';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lxbcgtsajrvcgbuyizck.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmNndHNhanJ2Y2didXlpemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTkwNTcsImV4cCI6MjAxNTA5NTA1N30.Ey3PDIXgcVqGtU1GAWCPMAKuDgLOC7BhtajQ_bHV5NI");


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