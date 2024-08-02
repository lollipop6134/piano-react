import React, { useEffect, useRef, useState } from "react";
import { NoteProps } from "../note/note";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../UserContext";
import { source } from '../../source';

export const NoteEditor = ({ note }: { note: NoteProps }) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const [audio, setAudio] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [noteExists, setNoteExists] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setAudio(note.note);
        const checkNoteExists = async () => {
            try {
                const response = await axios.get<{ exists: boolean }>(
                    `${source}/user_sounds`,
                    {
                        params: { fileName: `${note.note.trim()}_${user?.email}.mp3` }
                    }
                );
                setNoteExists(response.data.exists);
            } catch (error) {
                console.error('Error checking if sound exists:', error);
            }
        };
        checkNoteExists();

        const handleVisibilityChange = () => {
            if (document.hidden) {
                audioRef.current?.pause();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [note.note, user?.email]);

    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const selectedFile = fileList[0];
            setAudioUrl(URL.createObjectURL(selectedFile));
            setAudio(selectedFile.name);
            setAudioFile(selectedFile);
            setNoteExists(true);
        } else {
            setNoteExists(false);
        }
    };

    function clickNoteHandler() {
        const audioSrc = audioUrl || (audio === note?.note ? `/audio/users/${(note.note).trim()}_${user!.email}.mp3` : audio!);
        if (audioRef.current) {
            audioRef.current.pause();
        }
        const newAudio = new Audio(audioSrc);
        audioRef.current = newAudio;
        newAudio.play();
    };

    async function editNote() {
        const audioFormData = new FormData();
        audioFormData.append('audio', audioFile!);
        audioFormData.append('email', user!.email);
        audioFormData.append('name', (note.note).trim());
        try {
            await axios.post(`${source}/uploadUserNotes`, audioFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Error uploading sound:', error);
            alert('Error uploading sound. Please try again.');
            return;
        }
        window.alert(t('sound-saved'));
        window.location.reload();
    };

    return (
        <div id='noteEditor'>
            <label>{note.keyboard}</label>
            <button onClick={() => clickNoteHandler()} id="playChordButton" disabled={!noteExists}>{t('play-sound')}</button>
            <input type='file' onChange={handleAudioChange} accept='audio/*'></input>
            <h5>{t('choose-audio')}</h5>
            <div id='chordButtons'>
                {(audio !== note.note) && <button id="editNote" onClick={editNote}>{t('save-changes')}</button>}
            </div>
        </div>
    );
};
