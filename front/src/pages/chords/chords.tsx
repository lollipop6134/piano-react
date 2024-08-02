import React from 'react';
import './chords.css';
import { Footer } from '../../components/footer/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../UserContext'
import { ChordComponentAdmin } from '../../components/chordComponentAdmin/chordComponentAdmin';
import { useTranslation } from 'react-i18next';
import {source} from '../../source';

export interface Chord {
    id: number;
    chord: string,
    image: string;
    audio: string;
}

export function Chords() {

    const [chords, setChords] = useState<Chord[]>([]);
    const { user } = useAuth();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${source}/chords`)
          .then(response => response.json())
          .then(data => setChords(data))
          .catch(error => console.error('Error:', error));
    }, []);

    function clickChordHandler(chord: string) {
        const audio = new Audio(`/audio/chords/${chord}`);
        console.log(audio);
        audio.play();
    }

    async function addChord() {
        try {
            const response = await axios.post(`${source}/addChord`);
            return response.data;
        } catch (error) {
            console.error('Error during add chord: ', error);
            throw error;
        } finally {
            window.location.reload();
        }
    };

    const СhordComponent = ({chord}: {chord: Chord}) => {
        return (
            <div id='chord'>
                <h2>{chord.chord}</h2>
                <img src={`/images/chords/${chord.image}`} alt={chord.chord}></img>
                <button className='main-button' onClick={() => clickChordHandler(chord.audio)}>{t('play-chord')}</button>
            </div>
        );
    };

    return (
        <>
        <div id='chords'>
            <input
                id='searchChord'
                type="text"
                className='lessonSearch'
                placeholder={t('search') + " 🔍"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => window.print()} id='printChords'>{t('print-chords')}</button>
        {chords
        .filter(chord => chord.chord.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.chord.localeCompare(b.chord))
        .map((chord) => (
            user?.status === 'admin' ? <ChordComponentAdmin key={chord.chord} chord={chord} /> :
                                    <СhordComponent key={chord.chord} chord={chord} />
        ))}
            {user?.status === 'admin' && <button id='addChord' onClick={addChord}>+</button>}
        </div>
        <div className={searchTerm !== '' ? "search" : ""}>
            <Footer />
        </div>
        </>
    )
}
