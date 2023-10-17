import './lessonPage.css';
import { useParams } from 'react-router-dom';
import { lessonPages } from '../../data/lessonPages';
import { Footer } from '../../components/footer/footer';

export function LessonPage() {
    const { id } = useParams<{ id?: string }>();

    if (!id) {
        return <div className='notFound'>Урок не найден</div>
    }
    const lesson = lessonPages.find((l) => l.id === parseInt(id, 10));

    if (!lesson) {
        return <div className='notFound'>Урок не найден :(</div>;
    }

    return (
        <>
        <div id="lessonPage">
            <div id="lessonTitle">
                {lesson.title}
            </div>
            <div className='lessonSection'>
                <div className='lessonParagraph'>
                    {lesson.text1}
                </div>
                <img src={lesson.img1} alt="1" className='main_img'/>
            </div>
            <div className='lessonSection'>
                {lesson.text2}
            </div>
            <div className='lessonSection'>
                <img src={lesson.img2} alt="2" className='main_img'/>
                <div className='lessonParagraph'>
                    {lesson.text3}
                </div>
            </div>
            <div className='lessonSection'>
                <div className='lessonParagraph'>
                    {lesson.text4}
                </div>
                <img src={lesson.img3} alt="3" className='main_img'/>
            </div>
            <button className='main-button'>Practice!</button>
        </div>
        <Footer />
        </>
    )
}