import './lessons.css';
import { Footer } from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useEffect, useState } from 'react';

interface Lesson {
    id: number,
    subtitle: string;
}

export function Lessons() {

    const [lessonPages, setLessonPages] = useState<Lesson[]>([]);

    useEffect(() => {
        getLessonPages();
    }, [])

    async function getLessonPages() {
        const { data } = await supabase.from("Lessons").select(`id, subtitle`);
        setLessonPages(data || []);
    }


    return (
        <>
            {lessonPages.length < 1 && <div id='preloader'> Just a moment <div id='loader'></div></div>}
            <div className='lessons'>
                {lessonPages
                    .sort((a, b) => a.id - b.id)
                    .map((lesson) => (
                        <Link to={`/lesson/${lesson.id}`} className='lesson' key={lesson.id}>
                            Lesson {lesson.id}<br />
                            {lesson.subtitle}
                            {/* { ??? && <div id="complete">Complete!</div> } */}
                        </Link>
                    ))}
            </div>
            <Footer />
        </>
    )
}