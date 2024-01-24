import './lessons.css';
import { Footer } from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useEffect, useState } from 'react';

interface Lesson {
    id: number,
    subtitle: string;
}

interface LessonsProps {
    session: any;
}

export function Lessons({ session }: LessonsProps) {

    const [lessonPages, setLessonPages] = useState<Lesson[]>([]);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);

    async function getCompletedLessons() {
        if (session && session.user) {
            const { data, error } = await supabase
            .from('Users')
            .select('completedLessons')
            .eq('email', session.user.email)
            .single();
    
            if (error) {
                alert(error.message);
            } else {
                setCompletedLessons(data?.completedLessons || []);
            }
        }
    }

    useEffect(() => {
        getCompletedLessons();
    }, [session])

    useEffect(() => {
        getLessonPages();
    }, [])

    async function getLessonPages() {
        const { data } = await supabase.from("Lessons").select(`id, subtitle`);
        setLessonPages(data || []);
    }

    return (
        <>
        {session !== null ? <>
        {lessonPages.length < 1 && <div id='preloader'> Just a moment <div id='loader'></div></div>}
            <div className='lessons'>
                {lessonPages
                    .sort((a, b) => a.id - b.id)
                    .map((lesson) => (
                        <Link
                            to={ completedLessons.includes(lesson.id) || completedLessons.includes(lesson.id-1) ? `/lesson/${lesson.id}` : ''}
                            className={ completedLessons.includes(lesson.id) || completedLessons.includes(lesson.id-1) || (completedLessons.length === 0 && lesson.id === 1) ? 'lesson' : 'lesson disabled'}
                            key={lesson.id}>
                            Lesson {lesson.id} <br />
                            {lesson.subtitle}
                            {completedLessons.includes(lesson.id) && <div id="complete">Complete!</div>}
                        </Link>
                    ))}
            </div>
            <Footer />
        </> :
        <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
        <Link to={"/account"} className='main-button'>Sign In to start lessons!</Link>
        </div>
        <div className='bottom'><Footer /></div>
        </>}
        </>
    )
}
