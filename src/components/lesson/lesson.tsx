import './lesson.css';
import { ILesson } from '../../models';

interface LessonProps {
    lesson: ILesson
}

export function Lesson(props: LessonProps) {
    return (
        <div>
            <div className='lesson'>
                Lesson {props.lesson.id}.<br /> {props.lesson.title}
            </div>
        </div>
    )
}