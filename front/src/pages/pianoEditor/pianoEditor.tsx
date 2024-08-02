import React from 'react';
import { Footer } from '../../components/footer/footer';
import { useEffect, useState } from 'react';
import { NoteProps } from '../../components/note/note';
import { NoteEditor } from '../../components/noteEditor/noteEditor';
import './pianoEditor.css';
import {source} from '../../source';
import i18n from '../../i18n';
import axios from 'axios';

export function PianoEditor() {
    const [pianoNotes, setPianoNotes] = useState<NoteProps[]>([]);

    useEffect(() => {
        const lang = i18n.language;
        axios.get(`${source}/notes`, { params: { lang } })
          .then(response => response.data)
          .then(data => {
            setPianoNotes(data as NoteProps[]);
          })
          .catch(error => console.error('Error:', error));
      }, []);

    return (
        <div id='pianoEditor'>
            {pianoNotes
                .map((note) => (
                    <NoteEditor key={note.note} note={note}/>
                ))}
            <Footer />
        </div>
    )
}
