import React, { useRef } from 'react';
import './lessonPage.css';
import { useParams } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { useState, useEffect } from 'react';
import PracticePage from '../practicePage/practicePage';
import TestPage from '../test/testPage';
import { useAuth } from '../../UserContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { source } from '../../source';
import Comment from '../../components/comment/comment';

export interface Lesson {
    id: number;
    subtitle: string;
    title: string;
    information: string[];
    lesson_images: string[];
    notes: string[];
    practice_image: string;
    comments: any[];
    times_repeat: number;
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
    const { t } = useTranslation();
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [replyToId, setReplyToId] = useState<number | null>(null);
    const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

    const formatRelativeTime = (createdAt: string) => {
        const currentDate = new Date();
        const commentDate = new Date(createdAt);
        const timeDifference = currentDate.getTime() - commentDate.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        switch (true) {
            case minutesDifference < 1:
                return t('less-minute');
            case minutesDifference === 1:
                return t('1-minute');
            case minutesDifference < 60:
                return `${minutesDifference} ${t('minutes')}`;
            case minutesDifference >= 60 && minutesDifference < 120:
                return t('1-hour');
            case minutesDifference >= 120 && minutesDifference < 1440:
                return `${Math.floor(minutesDifference / 60)} ${t('hours')}`;
            case minutesDifference >= 1440 && minutesDifference < 2880:
                return t('1-day');
            case minutesDifference >= 2880:
                return `${Math.floor(minutesDifference / 1440)} ${t('days')}`;
            default:
                return createdAt;
        }
    };

    useEffect(() => {
        const lang = i18n.language;
        axios.get(`${source}/lessons?id=${id}`, { params: { lang } })
            .then(response => response.data)
            .then(data => {
                setLesson(data[0] as Lesson);
                setIsLoad(true);
                const intervalId = setInterval(() => {
                    setLesson(prevLesson => {
                        if (!prevLesson || !Array.isArray(prevLesson.comments)) return prevLesson;
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
            await axios.post(`${source}/deleteComment`, { commentId });
            setLesson(prevLesson => {
                if (!prevLesson || !Array.isArray(prevLesson.comments)) return prevLesson;
                const updatedComments = prevLesson.comments.filter(comment => comment.comment_id !== commentId);
                return {
                    ...prevLesson,
                    comments: updatedComments
                };
            });
        } catch (error) {
            console.error('Error deleting comment: ', error);
        }
    };

    const addComment = async (newComment: string) => {
        const parent_id = replyToId;
        try {
            const userId = user!.user_id;
            const response = await axios.post(`${source}/addComment`, { newComment, id, userId, parent_id });
            const addedComment = response.data;
            setLesson(prevLesson => {
                if (!prevLesson || !Array.isArray(prevLesson.comments)) {
                    window.location.reload();
                    return prevLesson;
                }
                return {
                    ...prevLesson,
                    comments: [...prevLesson.comments, addedComment]
                };
            });
            setNewComment('');
            setReplyTo(null);
            setReplyToId(null);
        } catch (error) {
            console.error('Error adding comment: ', error);
        }
    };

    const answerComment = (username: string, id: number) => {
        setReplyTo(username);
        setReplyToId(id);
        if (commentInputRef.current) {
            commentInputRef.current.focus();
        }
        setNewComment(`${username}, `);
    };

    const closeReply = () => {
        setReplyTo(null);
        setReplyToId(null);
        setNewComment('');
    };

    const buildCommentsTree = (comments: any[], parentId: number | null = null) => {
        if (comments) {
            return comments
            .filter(comment => comment.parent_id === parentId)
            .map(comment => ({
                ...comment,
                replies: buildCommentsTree(comments, comment.comment_id)
            }));
        } else {
            return [];
        }
    };

    const renderComments = (commentsTree: any[]) => {
        return commentsTree.map((comment: any, index: number) => (
            <Comment
                key={index}
                comment={comment}
                formatRelativeTime={formatRelativeTime}
                answerComment={answerComment}
                deleteComment={deleteComment}
                renderReplies={renderComments}
            />
        ));
    };

    if (!id || !lesson) {
        return (
            <>
                {!isLoad && <div id='preloader'> {t('preloader')} <div id='loader'></div></div>}
                <div className='notFound'>
                    <img src='/images/notFound.png' alt="Sad capybara" />
                    <div>Lesson not found :(</div>
                </div>
            </>
        );
    }

    const commentsTree = buildCommentsTree(lesson.comments);

    return (
        <>
            {!isLoad && <div id='preloader'> {t('preloader')} <div id='loader'></div></div>}
            {practiceMode ? (!lesson.is_test ? (
                <PracticePage
                    practiceNotes={lesson.notes}
                    id={lesson.id}
                    practiceImage={lesson.practice_image}
                    times_repeat={lesson.times_repeat}
                    isRandomNotes={lesson.is_random_notes}
                    isHint={Boolean(lesson.is_hint)}
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
                        <button className='main-button' onClick={() => handlePracticeModeToggle(true)}>{t('practice')}</button>
                    </div>
                    <div id='lessonPageButtons'>
                        <button onClick={() => setIsComments(!isComments)} className='print-button'>{t('comments')}</button>
                        <button onClick={() => window.print()} className='print-button'>{t('print-lesson')}</button>
                    </div>
                    {isComments && <div id='comments-container'>
                        {user && <div id='addComment'>
                            <textarea
                                placeholder={t('write-comment')}
                                value={newComment || ''}
                                onChange={(e) => setNewComment(e.target.value)}
                                ref={commentInputRef}></textarea>
                            {replyTo && <div id='replyingTo'>{t('replying-to')} {replyTo} <button onClick={closeReply}>✖</button></div>}
                            <button
                                className='main-button'
                                disabled={newComment === null || newComment === ''}
                                onClick={() => addComment(newComment!)}>
                                {t('send-comment')}
                            </button>
                        </div>}
                        <div style={{ userSelect: "none", marginTop: "1vw" }}>
                            {t('sort')} &nbsp;
                            <strong id='sort-comments'
                                onClick={() => setIsOldComments(!isOldComments)}>
                                {isOldComments ? t('old') : t('new')}
                            </strong>
                        </div>
                        <div id='comments' style={{ display: "flex", flexDirection: isOldComments ? "column" : "column-reverse" }}>
                            {renderComments(commentsTree)}
                        </div>
                    </div>}
                    <div style={{ marginTop: '3vw' }}>
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
}
