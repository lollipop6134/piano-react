import './chords.css';
import { Footer } from '../../components/footer/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../UserContext'
import { ChordComponentAdmin } from '../../components/chordComponentAdmin/chordComponentAdmin';

export interface Chord {
    id: number;
    chord: string,
    image: string;
    audio: string;
}

export function Chords() {

    const [chords, setChords] = useState<Chord[]>([]);
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/chords')
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
            const response = await axios.post(`http://localhost:3001/addChord`);
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
                <button className='main-button' onClick={() => clickChordHandler(chord.audio)}>Play chord</button>
            </div>
        );
    };

    return (
        <div id='chords'>
            <input
                id='searchChord'
                type="text"
                className='lessonSearch'
                placeholder="Search by title &#128269;"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => window.print()} id='printChords'>Print Chords</button>
        {chords
        .filter(chord => chord.chord.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.chord.localeCompare(b.chord))
        .map((chord) => (
            user?.status === 'admin' ? <ChordComponentAdmin key={chord.chord} chord={chord} /> :
                                    <СhordComponent key={chord.chord} chord={chord} />
        ))}
            {user?.status === 'admin' && <button id='addChord' onClick={addChord}>+</button>}
            <Footer />
        </div>
    )
}
