import './lessonPage.css';
import { ILessonPage } from '../../models';
import { Footer } from '../../components/footer/footer';

interface LessonPageProps {
    lessonPage: ILessonPage
}

const LessonPage: React.FC<LessonPageProps> = ({ lessonPage }) => {
    return (
        <>
        <div id="lessonPage">
            <div id="lessonTitle">
                {lessonPage.title}
            </div>
            <div className='lessonSection'>
                <div className='lessonParagraph'>
                    {lessonPage.text1}
                </div>
                <img src='./images/${lessonPage.img1}.jpg' alt="Question Capy" className='main_img'/>
            </div>
            <div className='lessonSection'>
                {lessonPage.text2}
            </div>
            <div className='lessonSection'>
                <img src='./images/${lessonPage.img2}.jpg' alt="piano keyboard" className='main_img'/>
                <div className='lessonParagraph'>
                    {lessonPage.text3}
                </div>
            </div>
            <div className='lessonSection'>
                <div className='lessonParagraph'>
                    {lessonPage.text4}
                </div>
                <img src='./images/${lessonPage.img3}.jpg' alt="octave" className='main_img'/>
            </div>
            <button className='main-button'>Practice!</button>
        </div>
        <Footer />
        </>
    )
}

export default LessonPage;