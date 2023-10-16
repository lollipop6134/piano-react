import './lessons.css';
import { lessons } from '../../data/lessons';
import { Lesson } from '../../components/lesson/lesson';
import { Footer } from '../../components/footer/footer';

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