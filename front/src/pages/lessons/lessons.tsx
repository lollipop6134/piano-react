import React from 'react';
import './lessons.css';
import { Footer } from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../UserContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import {source} from '../../source';

interface Lesson {
    id: number,
    subtitle: string;
}

export function Lessons() {

    const [lessonPages, setLessonPages] = useState<Lesson[]>([]);
    const { user } = useAuth();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const isUnlocked = (lessonId: number) => {
        if (user?.completedlessons.includes(lessonId) || user?.completedlessons.includes(lessonId-1) 
            || (!user?.completedlessons.length && lessonId === 1 ) || user?.status === 'admin') return true;
        return false;
    }

    useEffect(() => {
        const lang = i18n.language;
        axios.get(`${source}/lessons`, { params: { lang } })
        .then(response => {
            setLessonPages(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [i18n.language]);

    const deleteLesson = async (lessonId: number) => {
        try {
            const response = await axios.post(`${source}/deleteLesson`, { lessonId });
            return response.data;
        } catch (error) {
            console.error('Error deleting lesson: ', error);
            throw error;
        } finally {
            window.location.reload();
        }
    };

    async function addLesson(lessonId: number) {
        try {
            const response = await axios.post(`${source}/addLesson`, {lessonId});
            return response.data;
        } catch (error) {
            console.error('Error deleting lesson: ', error);
            throw error;
        } finally {
            window.location.reload();
        }
    };


    const LessonComponent = ({ lesson }: { lesson: Lesson }) => {
        const [isSure, setIsSure] = useState(false);

        return (
            <div className={isUnlocked(lesson.id) ? 'lesson' : 'lesson disabled'} key={lesson.id}>
                <Link to={isUnlocked(lesson.id) ? `/lesson/${lesson.id}` : ''} >
                    {t('lesson')} {lesson.id} <br />
                    {lesson.subtitle}
                </Link>
                {user?.status === 'user' && user?.completedlessons.includes(lesson.id) && <div id="complete">{t('complete')}</div>}
                {user?.status === 'admin' &&
                    <div id='lessonIcons'>
                        <Link to={`/lesson/${lesson.id}/constructor`}>{t('edit')}</Link>
                        {!isSure ? <button onClick={() => setIsSure(true)}>{t('delete')}</button> :
                            <button onClick={() => deleteLesson(lesson.id)} style={{color: 'beige'}}>{t('sure')}</button>}
                    </div>}
            </div>
        );
    };

    function getMaxId(): number {
        const lessonIds = lessonPages.map(lesson => lesson.id);
        return Math.max(...lessonIds);
    }

    return (
        <>
            <input
                type="text"
                className='lessonSearch'
                placeholder={t('search') + " 🔍"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {lessonPages.length < 1 && <div id='preloader'> {t('preloader')} <div id='loader'></div></div>}
            <div className='lessons'>
            {lessonPages
                .filter(lesson => lesson.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
                .sort((a, b) => a.id - b.id)
                .map((lesson) => (
                <LessonComponent key={lesson.id} lesson={lesson} />
            ))}
                {user?.status === 'admin' && <button id='addLesson' onClick={() => addLesson(getMaxId()+1)}>+</button>}
            </div>
            {!user && <div id='signupLessons'>
                <Link to='/account'><button className='main-button'>{t('signup-lessons')}</button></Link>
            </div>}
            <div className={searchTerm !== '' ? "search" : ""}>
                <Footer />
            </div>
        </>
    )
}

