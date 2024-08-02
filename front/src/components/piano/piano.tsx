import React from 'react';
import './piano.css';
import Note from '../note/note';
import { NoteProps } from '../note/note';
import { useTranslation } from 'react-i18next';

type Props = {
  pianoNotes: NoteProps[];
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Piano: React.FC<Props> = ({ pianoNotes, clickHandler }) =>{

  const { t } = useTranslation();

    return (
        <>
            <div id="rotate">{t('rotate-phone')}<img src='/images/RotatePhone.png' alt='rotate phone' /></div>
            <div id="piano">
                {pianoNotes.map((element: NoteProps) => (
                  <Note
                    note={element.note}
                    key={element.note}
                    color={element.color}
                    clickHandler={clickHandler}
                    keyboard={element.keyboard}
                  />
                ))}
            </div>
        </>
    )
}

export default Piano;