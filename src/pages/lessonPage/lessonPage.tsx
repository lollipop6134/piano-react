import './lessonPage.css';
import { useParams } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { useState, useEffect } from 'react';
import PracticePage from '../practicePage/practicePage';
import Test from '../test/test';
import { supabase } from '../../supabaseClient';

interface Lesson {
    id: number,
    subtitle: string;
    title: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    img1: string;
    img2: string;
    img3: string;
    notes: string[];
    practiceImage: string[];
}

interface lessonPageProps {
    session: any;
}

export function LessonPage({ session }: lessonPageProps) {
    const { id } = useParams<{ id?: string }>();
    const [practiceMode, setPracticeMode] = useState(false);
    const [lesson, setLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        getLessonPages();
        const storedPracticeMode = localStorage.getItem('practiceMode');
        if (storedPracticeMode) {
            setPracticeMode(storedPracticeMode === 'true');
        }
    }, [id]);

    async function getLessonPages() {
        const { data } = await supabase.from("Lessons").select().eq(`id`, id);
        setLesson(data?.[0] || null);
    }

    const handlePracticeModeToggle = (newPracticeMode: boolean) => {
        setPracticeMode(newPracticeMode);
        localStorage.setItem('practiceMode', newPracticeMode.toString());
    };

    if (!id || !lesson) {
        return (
            <>
                {(lesson?.img1 !== null || lesson?.img2 !== null || lesson?.img3 !== null) && <div id='preloader'> Just a moment <div id='loader'></div></div>}
                <div className='notFound'>
                    <img src='/images/notFound.png' alt="Sad capybara" />
                    <div>Lesson not found :(</div>
                </div>
            </>
        )
    }

    return (
        <>
        {(lesson.img1 === null || lesson.img2 === null || lesson.img3 === null) && <div id='preloader'> Just a moment <div id='loader'></div></div>}
        {practiceMode ? ( lesson.id !== 9 ?
            <PracticePage practiceNotes={lesson.notes} id={lesson.id} practiceImage={lesson.practiceImage} session={session}/> : <Test id={lesson.id} session={session}/>
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
                <img src={`/images/${lesson.img1}.webp`} alt="1" className='main_img'/>
            </div>
            <div className='lessonSection'>
                {lesson.text2}
            </div>
            <div className='lessonSection'>
                <img src={`/images/${lesson.img2}.webp`} alt="2" className='main_img'/>
                <div className='lessonParagraph'>
                    {lesson.text3}
                </div>
            </div>
            <div className='lessonSection'>
                <div className='lessonParagraph'>
                    {lesson.text4}
                </div>
                <img src={`/images/${lesson.img3}.webp`} alt="3" className='main_img'/>
            </div>
            {lesson.text5 !== '' && <div className='lessonSection'>
                {lesson.text5}
            </div>}
            <button className='main-button' onClick={() => handlePracticeModeToggle(true)}>Practice!</button>
        </div>
        <Footer />
        </>
        )}
        </>
    )
}