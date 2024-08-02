import './lessonConstructor.css';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import React, { useState, useEffect } from 'react';
import { Lesson } from '../lessonPage/lessonPage';
import axios from 'axios';
import { NoteProps } from "../../components/note/note";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import LanguageSwitcher from '../../components/languageSwitcher/languageSwitcher';
import {source} from '../../source';

export function LessonConstructor() {
    const { id } = useParams<{ id?: string }>();
    const [isLoad, setIsLoad] = useState(false);
    const [title, setTitle] = useState<string | null>(null);
    const [information1, setInformation1] = useState<string | null>(null);
    const [information2, setInformation2] = useState<string | null>(null);
    const [information3, setInformation3] = useState<string | null>(null);
    const [information4, setInformation4] = useState<string | null>(null);
    const [information5, setInformation5] = useState<string | null>(null);
    const [subtitle, setSubtitle] = useState<string | null>(null);
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [image3, setImage3] = useState<string | null>(null);
    const [imageFile1, setImageFile1] = useState<File | null>(null);
    const [imageFile2, setImageFile2] = useState<File | null>(null);
    const [imageFile3, setImageFile3] = useState<File | null>(null);
    const [previewImage1, setPreviewImage1] = useState<string | null>(null);
    const [previewImage2, setPreviewImage2] = useState<string | null>(null);
    const [previewImage3, setPreviewImage3] = useState<string | null>(null);    
    const [lessonNotes, setLessonNotes] = useState<string[] | null>(null);
    const [pianoNotes, setPianoNotes] = useState<NoteProps[]>([]);
    const [isRandomNotes, setIsRandomNotes] = useState<boolean>();
    const [timesRepeat, setTimesRepeat] = useState<number|null>();
    const [isHint, setIsHint] = useState<boolean>();
    const [hintImage, setHintImage] = useState<string | null>(null);
    const [hintImageFile, setHintImageFile] = useState<File | null>(null);
    const [hintPreviewImage, setHintPreviewImage] = useState<string | null>(null);
    const [practiceImage, setPracticeImage] = useState<string | null>(null);
    const [practiceImageFile, setPracticeImageFile] = useState<File | null>(null);
    const [practicePreviewImage, setPracticePreviewImage] = useState<string | null>(null);
    const [isTest, setIsTest] = useState<boolean | null>(null);

    const { t } = useTranslation();

    const handleNoteClick = (note: string) => {
        setLessonNotes(prevNotes => prevNotes ? [...prevNotes, note.trim()] : [note.trim()]);
        const audio = new Audio(`/audio/${(note).trim()}-piano.mp3`);
        audio.play();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setLessonNotes(value.split(',').map(note => note.trim()));
    };

    useEffect(() => {
        const lang = i18n.language;
        axios.get(`${source}/notes`, { params: { lang } })
          .then(response => response.data)
          .then(data => {
            setPianoNotes(data as NoteProps[]);
          })
          .catch(error => console.error('Error:', error));
      }, []);

    useEffect(() => {
        const lang = i18n.language;
        axios.get(`${source}/lessons?id=${id}`, {params: { lang }})
            .then(response => response.data)
            .then(data => {
                const lessonData = data[0] as Lesson;
                setTitle(lessonData.title || '');
                setInformation1(lessonData.information[0] || '');
                setInformation2(lessonData.information[1] || '');
                setInformation3(lessonData.information[2] || '');
                setInformation4(lessonData.information[3] || '');
                setInformation5(lessonData.information[4] || '');
                setImage1(lessonData.lesson_images[0] || '');
                setImage2(lessonData.lesson_images[1] || '');
                setImage3(lessonData.lesson_images[2] || '');
                setSubtitle(lessonData.subtitle || '');
                setLessonNotes(lessonData.notes);
                setIsRandomNotes(Boolean(lessonData.is_random_notes));
                setTimesRepeat(lessonData.times_repeat);
                setIsHint(Boolean(lessonData.is_hint));
                setHintImage(lessonData.hint_image);
                setPracticeImage(lessonData.practice_image);
                setIsTest(Boolean(lessonData.is_test));
                setIsLoad(true);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    async function editLesson(lessonId: number) {
        const information = [information1, information2, information3, information4, information5];
        const lessonImages = [image1, image2, image3];
        const imageFiles = [imageFile1, imageFile2, imageFile3];
        const otherImages = [hintImage, practiceImage];
        const otherImagesFiles = [hintImageFile, practiceImageFile];
        for (let i = 0; i < lessonImages.length; i++) {
            if (lessonImages[i] && imageFiles[i]) {
              const formData = new FormData();
              formData.append('image', imageFiles[i]!);
              try {
                await axios.post(`${source}/uploadLessons`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
              } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file. Please try again.');
                return;
              }
            }
          }
          for (let i = 0; i < otherImages.length; i++) {
            if (otherImages[i] && otherImagesFiles[i]) {
              const formData = new FormData();
              formData.append('image', otherImagesFiles[i]!);
              try {
                await axios.post(`${source}/uploadLessons`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
              } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file. Please try again.');
                return;
              }
            }
          }
          window.location.reload();
        try {
            const lang = i18n.language;
            if (!isTest && lessonNotes === null) {
                alert(t('enter-notes'));
                return;
            } 
            if(timesRepeat === undefined) {setTimesRepeat(null);}
          const response = await axios.post(`${source}/editLesson`, {
            subtitle, title, information, lessonId, lessonImages, lessonNotes, isRandomNotes, timesRepeat, isHint, hintImage, practiceImage, lang, isTest
          });
          return response.data;
        } catch (error) {
          console.error('Error editing lesson: ', error);
          throw error;
        }
      }

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>, setFile: React.Dispatch<React.SetStateAction<File | null>>, setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
          const selectedFile = fileInput.files[0];
          setImage(selectedFile.name);
          setFile(selectedFile);
          setPreviewImage(URL.createObjectURL(selectedFile));
        }
      };


    return (
        <>
        <div id='langButton'>{t('edited-lang')} &nbsp;<LanguageSwitcher /></div>
        {!isLoad && <div id='preloader'> {t('preloader')} <div id='loader'></div></div>}
            <div id="lessonPage">
            <div id="lessonTitle">
                {t('title')}
            <input
                value={title || ''}
                type='text'
                required
                onChange={(e) => setTitle(e.target.value)}>
            </input>
            </div>
            <div id='subtitle'>
                    {t('subtitle')}
                    <input
                        value={subtitle || ''}
                        type='text'
                        required
                        onChange={(e) => setSubtitle(e.target.value)}>
                    </input>
            </div>
            <div className='lessonSection'>
                <div className='lessonParagraph'>
                    <textarea
                        value={information1 || ''}
                        required
                        onChange={(e) => setInformation1(e.target.value)}>
                    </textarea>
                </div>
                <div id='loadImage'>
                <img src={previewImage1 || `/images/${image1}`} alt="1" className='main_img'/>
                <input type='file' onChange={(e) => handleFileChange(e, setImage1, setImageFile1, setPreviewImage1)} accept='image/*'></input>
                    <span>{t('choose-image')}</span>
                </div>
            </div>
            <div className='lessonSection'>
                    <textarea
                        value={information2 || ''}
                        required
                        onChange={(e) => setInformation2(e.target.value)}>
                    </textarea>
            </div>
            <div className='lessonSection'>
                <div id='loadImage'>
                <img src={previewImage2 || `/images/${image2}`} alt="2" className='main_img'/>
                <input type='file' onChange={(e) => handleFileChange(e, setImage2, setImageFile2, setPreviewImage2)} accept='image/*'></input>
                    <span>{t('choose-image')}</span>
                </div>
                <div className='lessonParagraph'>
                    <textarea
                        value={information3 || ''}
                        required
                        onChange={(e) => setInformation3(e.target.value)}>
                    </textarea>
                </div>
            </div>
            <div className='lessonSection №5'>
                <div className='lessonParagraph'>
                    <textarea
                        value={information4 || ''}
                        required
                        onChange={(e) => setInformation4(e.target.value)}>
                    </textarea>
                </div>
                <div id='loadImage'>
                <img src={previewImage3 || `/images/${image3}`} alt="3" className='main_img'/>
                <input type='file' onChange={(e) => handleFileChange(e, setImage3, setImageFile3, setPreviewImage3)} accept='image/*'></input>
                    <span>{t('choose-image')}</span>
                </div>
            </div>
            <div className='lessonSection'>
                <textarea
                    value={information5 || ''}
                    onChange={(e) => setInformation5(e.target.value)}>
                </textarea>
            </div>
            <div id='otherSettings'>
                {t('other-settings')}
                <div id="isTest">
                    <label className={isTest === false ? 'active' : ''}>
                        <input
                        type="radio"
                        checked={isTest === false}
                        onChange={() => setIsTest(false)}
                        />
                        {t('practice-mode')}
                    </label>
                    <label className={isTest === true ? 'active' : ''}>
                        <input
                        type="radio"
                        checked={isTest === true}
                        onChange={() => setIsTest(true)}
                        />
                        {t('test-mode')}
                    </label>
                </div>
                {isTest ?
                    <Link to={`/lesson/${id}/test`} target='_blank' id='testEditor'>{t('test-editor')}</Link> :
                <div>
                    <div id='practiceNotes'>
                        <label>{t('practice-notes')}</label>
                        <textarea
                            value={lessonNotes?.join(', ')}
                            onChange={handleInputChange}
                            disabled={true}
                        />
                        <button onClick={() => setLessonNotes(prevNotes => prevNotes ? prevNotes.slice(0, -1) : [])}>←</button>
                        <button onClick={() => setLessonNotes([])}>{t('clear')}</button>
                        <div>
                            {pianoNotes.map((note, index) => (
                                <button key={index} onClick={() => handleNoteClick(note.note)}>
                                    {t(note.note.trim())}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div id='checkboxes'>
                        <div id='isRandomNotes'>
                            {t('random-notes')}
                            <input
                                className='checkbox'
                                type="checkbox"
                                checked={isRandomNotes || false}
                                onChange={(e) => {setIsRandomNotes(e.target.checked); setTimesRepeat(isRandomNotes ? timesRepeat : 0)}}>
                            </input>
                        </div>
                        <div id='isHint'>
                            {t('hint')}
                            <input
                                type="checkbox"
                                checked={isHint || false}
                                onChange={(e) => {setIsHint(e.target.checked)}}>
                            </input>
                        </div>
                    </div>
                    <div id='otherSettingsThree'>
                        {isRandomNotes &&
                            <div id='repeat'>
                                {t('repeat')}
                                    <input
                                        type="number"
                                        disabled={!isRandomNotes}
                                        value={timesRepeat && isRandomNotes ? timesRepeat : ''}
                                        onChange={(e) => setTimesRepeat(e.target.value !== undefined ? parseInt(e.target.value) : 0)}>
                                    </input> {t('times')}
                            </div>
                        }
                        {!isRandomNotes && 
                        <div id='loadImage'>
                            {t('practice-image')}:
                            <img src={practicePreviewImage || `/images/${practiceImage}`} alt={t('practice-image')} className='main_img'/>
                            <input type='file' onChange={(e) => handleFileChange(e, setPracticeImage, setPracticeImageFile, setPracticePreviewImage)} accept='image/*'></input>
                            <span>{t('choose-image')}</span>
                        </div>
                        }
                        {isHint && 
                            <div id='loadImage'>
                                {t('hint')}:
                                <img src={hintPreviewImage || `/images/${hintImage}`} alt={t('hint')} className='main_img'/>
                                <input type='file' onChange={(e) => handleFileChange(e, setHintImage, setHintImageFile, setHintPreviewImage)} accept='image/*'></input>
                                <span>{t('choose-image')}</span>
                            </div>
                        }
                    </div>
                </div>}
            </div>
            <button
                className='main-button'
                onClick={() => editLesson(Number.parseInt(id!))}>
                {t('save-changes')}
            </button>
        </div>
        <div style={{marginTop: '3vw'}}>
            <Footer />
        </div>
        </>
    )
}