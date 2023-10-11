import './lessons.css';
import './lesson.css';
import { lessons } from '../../data/lessons';
import { Lesson } from './lesson';
import { Footer } from '../footer/footer';

export function Lessons() {
    return (
        <>
            <div id="lessons">
                {lessons.map(lesson => <Lesson lesson={lesson} key={lesson.id} />)}
            </div>
            <Footer />
        </>
    )
}