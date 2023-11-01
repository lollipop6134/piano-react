import './lessonPage.css';
import { useParams } from 'react-router-dom';
import { lessonPages } from '../../data/lessonPages';
import { Footer } from '../../components/footer/footer';
import { useState, useEffect } from 'react';
import PracticePage from '../practicePage/practicePage';
import Test from '../test/test';

export function LessonPage() {
    const { id } = useParams<{ id?: string }>();
    const [practiceMode, setPracticeMode] = useState(false);

    useEffect(() => {
        const storedPracticeMode = localStorage.getItem('practiceMode');
        if (storedPracticeMode) {
            setPracticeMode(storedPracticeMode === 'true');
        }
    }, []);

    const handlePracticeModeToggle = (newPracticeMode: boolean) => {
        setPracticeMode(newPracticeMode);
        localStorage.setItem('practiceMode', newPracticeMode.toString());
    };

    if (!id) {
        return (
            <div className='notFound'>
                <img src="/images/notFound.png" alt="Sad capybara" />
                <div>Lesson not found :(</div>
            </div>
        )
    }
    const lesson = lessonPages.find((l) => l.id === parseInt(id, 10));

    if (!lesson) {
        return (
            <div className='notFound'>
                <img src="/images/notFound.png" alt="Sad capybara" />
                <div>Lesson not found :(</div>
            </div>
        )
    }

    return (
        <>
        {practiceMode ? ( lesson.id !== 9 ?
            <PracticePage practiceNotes={lesson.notes} id={lesson.id} practiceImage={lesson.practiceImage} /> : <Test id={lesson.id} />
        ) : (
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
            <div className='lessonSection'>
                {lesson.text5}
            </div>
            <button className='main-button' onClick={() => handlePracticeModeToggle(true)}>Practice!</button>
        </div>
        <Footer />
        </>
        )}
        </>
    )
}