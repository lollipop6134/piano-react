import './lessons.css';
import { Footer } from '../../components/footer/footer';
import { lessonPages } from '../../data/lessonPages';
import { Link } from 'react-router-dom';

export function Lessons() {

    return (
        <>
            <div className='lessons'>
                {lessonPages.map((lesson) => (
                    <Link to={`/lesson/${lesson.id}`} className='lesson' key={lesson.id}>Lesson {lesson.id}<br />{lesson.subtitle}
                    {/* { ??? && <div id="complete">Complete!</div> } */}
                    </Link>
                ))}
            </div>
            <Footer />
        </>
    )
}