import React, { useEffect, useState } from "react";
import { Chord } from "../../pages/chords/chords";
import axios from "axios";

export const ChordComponentAdmin = ({chord}: {chord: Chord}) => {

    const [chordName, setChordName] = useState<string | null>(null);
    const [isSure, setIsSure] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [audio, setAudio] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [audioFile, setAudioFile] = useState<File| null>(null);

    useEffect(() => {
        setChordName(chord.chord);
        setImage(chord.image);
        setAudio(chord.audio);
      }, [chord.chord, chord.audio, chord.image]);

      async function deleteChord(id: number) {
        try {
            const response = await axios.post(`http://localhost:3001/deleteChord`, { id });
            return response.data;
        } catch (error) {
            console.error('Error during deleting chord: ', error);
            throw error;
        } finally {
            window.location.reload();
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
          const selectedFile = fileList[0];
          setImageUrl(URL.createObjectURL(selectedFile));
          setImage(selectedFile.name);
          setImageFile(selectedFile);
        }
      };

      const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
          const selectedFile = fileList[0];
          setAudioUrl(URL.createObjectURL(selectedFile));
          setAudio(selectedFile.name);
          setAudioFile(selectedFile);
        }
      };

      function clickChordHandler() {
        const audioPlay = new Audio(audioUrl || (audio === chord?.audio ? `/audio/chords/${chord.audio}` : audio!));
        audioPlay.play();
    };

    async function editChord() {
        const chord_id = chord.id;
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile!);
        try {
            await axios.post('http://localhost:3001/uploadChords', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
            return;
        }
        const audioFormData = new FormData();
        audioFormData.append('audio', audioFile!);
        try {
            await axios.post('http://localhost:3001/uploadChordsAudio', audioFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Error uploading audio:', error);
            alert('Error uploading audio. Please try again.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/editChord', { chordName, image, audio, chord_id });
            return response.data;
        } catch (error) {
            console.error('Error editing chord: ', error);
            throw error;
        }
    };
    
    return (
        <div id='chord'>
            <input 
                type='text'
                value={chordName || ''}
                onChange={(e) => setChordName(e.target.value)}
            />
            <div id="loadImageChord">
                <img src={imageUrl || (image === chord?.image ? `/images/chords/${chord.image}` : image!)} alt={chord.chord}/>
                <input type='file' onChange={handleImageChange} accept='image/*'></input>
                <h3>Choose Image</h3>
                <input type='file' onChange={handleAudioChange} accept='audio/*'></input>
                <h3>Choose Audio</h3>
            </div>
            <button onClick={() => clickChordHandler()} id="playChordButton">Play chord</button>
            <div id='chordButtons'>    
                {!isSure ?
                    <button onClick={() => setIsSure(true)} id="deleteChord">Delete Chord</button> :
                    <button onClick={() => deleteChord(chord.id)} id="deleteChord" style={{color: 'beige'}}>Sure?</button>
                }
                {(chord.chord !== chordName || image !== chord?.image || audio !== chord.audio) &&
                    <button id="editChord" onClick={editChord}>Save Changes</button>
                }
            </div>
        </div>
    );
};