import './lessonPage.css';
import { useParams } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { useState, useEffect } from 'react';
import PracticePage from '../practicePage/practicePage';
import TestPage from '../test/testPage';
import { useAuth } from '../../UserContext';
import axios from 'axios';

export interface Lesson {
    id: number;
    subtitle: string;
    title: string;
    information: string[];
    lesson_images: string[];
    notes: string[];
    practice_image: string;
    comments: string[];
    repeat: number;
    is_random_notes: boolean;
    is_test: boolean;
    is_hint: boolean;
    hint_image: string;
}

export function LessonPage() {
    const { id } = useParams<{ id?: string }>();
    const [practiceMode, setPracticeMode] = useState(false);
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [isLoad, setIsLoad] = useState(false);
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState<string | null>(null);
    const { user } = useAuth();
    const [isOldComments, setIsOldComments] = useState(false);

    const formatRelativeTime = (createdAt: string) => {
        const currentDate = new Date();
        const commentDate = new Date(createdAt);
        const timeDifference = currentDate.getTime() - commentDate.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        switch (true) {
            case minutesDifference < 1:
                return 'less than minute';
            case minutesDifference === 1:
                return '1 minute';
            case minutesDifference < 60:
                return `${minutesDifference} minutes`;
            case minutesDifference >= 60 && minutesDifference < 120:
                return `1 hour`;
            case minutesDifference >= 120 && minutesDifference < 1440:
                return `${Math.floor(minutesDifference / 60)} hours`;
            case minutesDifference >= 1440 && minutesDifference < 2880:
                return `1 day`;
            case minutesDifference >= 2880:
                return `${Math.floor(minutesDifference / 1440)} days`
            default:
                return createdAt;
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3001/lessons?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setLesson(data[0] as Lesson);
                setIsLoad(true);
                // Запускаем таймер для обновления времени каждые 60 секунд
                const intervalId = setInterval(() => {
                    setLesson(prevLesson => {
                        if (!prevLesson) return prevLesson;
                        const commentsWithUpdatedTime = prevLesson.comments.map((comment: any) => {
                            return {
                                ...comment,
                                created_at: formatRelativeTime(comment.created_at),
                            };
                        });
                        return {
                            ...prevLesson,
                            comments: commentsWithUpdatedTime,
                        };
                    });
                }, 60000);
                // Очищаем таймер при размонтировании компонента
                return () => clearInterval(intervalId);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handlePracticeModeToggle = (newPracticeMode: boolean) => {
        setPracticeMode(newPracticeMode);
        localStorage.setItem('practiceMode', newPracticeMode.toString());
    };

    const deleteComment = async (commentId: number) => {
        try {
            const response = await axios.post(`http://localhost:3001/deleteComment`, { commentId });
            return response.data;
        } catch (error) {
            console.error('Error deleting lesson: ', error);
            throw error;
        } finally {
            window.location.reload();
        }
    };

    const addComment = async (newComment: string) => {
        try {
            const userId = user!.user_id;
            const response = await axios.post('http://localhost:3001/addComment', {newComment, id, userId});
            return response.data;
        } catch (error) {
            console.error('Error adding lesson: ', error);
        } finally {
            window.location.reload();
        }
    }

    if (!id || !lesson) {
        return (
            <>
                {!isLoad && <div id='preloader'> Just a moment <div id='loader'></div></div>}
                <div className='notFound'>
                    <img src='/images/notFound.png' alt="Sad capybara" />
                    <div>Lesson not found :(</div>
                </div>
            </>
        );
    };

    return (
        <>
            {!isLoad && <div id='preloader'> Just a moment <div id='loader'></div></div>}
            {practiceMode ? (!lesson.is_test ? (
                <PracticePage
                    practiceNotes={lesson.notes}
                    id={lesson.id}
                    practiceImage={lesson.practice_image}
                    repeat={lesson.repeat}
                    isRandomNotes={lesson.is_random_notes}
                    isHint={lesson.is_hint}
                    hintImage={lesson.hint_image}
                />
            ) : (
                <TestPage lesson_id={lesson.id} />
            )) : (
                <>
                    <div id="lessonPage">
                        <div id="lessonTitle">
                            {lesson.title}
                        </div>
                        <div className='lessonSection'>
                            <div className='lessonParagraph'>
                                {lesson.information[0]}
                            </div>
                            <img src={`/images/${lesson.lesson_images[0]}`} alt="1" className='main_img' />
                        </div>
                        <div className='lessonSection'>
                            {lesson.information[1]}
                        </div>
                        <div className='lessonSection'>
                            <img src={`/images/${lesson.lesson_images[1]}`} alt="2" className='main_img' />
                            <div className='lessonParagraph'>
                                {lesson.information[2]}
                            </div>
                        </div>
                        <div className='lessonSection №5'>
                            <div className='lessonParagraph'>
                                {lesson.information[3]}
                            </div>
                            <img src={`/images/${lesson.lesson_images[2]}`} alt="3" className='main_img' />
                        </div>
                        {lesson.information[4] !== '' && <div className='lessonSection'>
                            {lesson.information[4]}
                        </div>}
                        <button className='main-button' onClick={() => handlePracticeModeToggle(true)}>Practice!</button>
                    </div>
                    <div id='lessonPageButtons'>
                        <button onClick={() => setIsComments(!isComments)} className='print-button'>Comments</button>
                        <button onClick={() => window.print()} className='print-button'>Print this lesson</button>
                    </div>
                    {isComments && <div id='comments-container'>
                        { user && <div id='addComment'>
                            <textarea placeholder='Write Your Comment!' onChange={(e) => setNewComment(e.target.value)}></textarea>
                            <button
                                className='main-button'
                                disabled={newComment === null || newComment === ''}
                                onClick={() => addComment(newComment!)}>
                                Send Comment
                            </button>
                        </div>}
                        <div style={{userSelect: "none", marginTop: "1vw"}}>
                            Sort by: &nbsp;
                            <strong id='sort-comments'
                                onClick={() => setIsOldComments(!isOldComments)}>
                                {isOldComments ? "old" : "new"}
                            </strong>
                        </div>
                        <div id='comments' style={{ display: "flex", flexDirection: isOldComments ? "column" : "column-reverse"}}>
                            {lesson.comments.map((comment: any, index: number) => (
                                <div id='comment_container' key={index}>
                                    <div id='comment'>
                                        <img id='comment_image' src={`/images/users/${comment.image}`} alt={`${comment.image}`}></img>
                                        <div id='comment_info'>
                                            <div>{comment.username}</div>
                                            <div id='comment_text'>{comment.comment}</div>
                                            <div id='comment_last'>
                                                <div>{formatRelativeTime(comment.created_at)} ago</div>
                                                { (comment.user_id === user?.user_id || user?.status === 'admin') &&
                                                <div id='comment_delete' onClick={() => deleteComment(comment.id)}>
                                                    Delete this comment
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
                    <Footer />
                </>
            )}
        </>
    );
}
