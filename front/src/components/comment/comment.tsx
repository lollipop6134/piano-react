import React, { useState } from 'react';
import { useAuth } from '../../UserContext';
import { useTranslation } from 'react-i18next';

interface CommentProps {
    comment: any;
    formatRelativeTime: (createdAt: string) => string;
    answerComment: (username: string, id: number) => void;
    deleteComment: (commentId: number) => void;
    renderReplies: (replies: any[]) => React.JSX.Element[];
}

const Comment: React.FC<CommentProps> = ({ comment, formatRelativeTime, answerComment, deleteComment, renderReplies }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [isRepliesVisible, setIsRepliesVisible] = useState(false);

    return (
        <div id='comment_container'>
            <div id={comment.parent_id ? "reply" : "comment"}>
                <img id='comment_image' src={`/images/users/${comment.image}`} alt={`${comment.image}`} />
                <div id='comment_info'>
                    <div>{comment.username}</div>
                    <div id='comment_text'>{comment.comment}</div>
                    <div id={comment.parent_id ? 'comment_last_reply' : 'comment_last'}>
                        <div>{formatRelativeTime(comment.created_at)} {t('ago')}</div>
                        <div id='comment_delete'>
                            {!comment.parent_id && (
                                <button onClick={() => setIsRepliesVisible(!isRepliesVisible)}>
                                    {isRepliesVisible ? t('hide-replies') : t('open-replies')}
                                </button>
                            )}
                            <button onClick={() => answerComment(comment.username, comment.comment_id)}>
                                {t('answer-comment')}
                            </button>
                            {(comment.user_id === user?.user_id || user?.status === 'admin') && (
                                <button onClick={() => deleteComment(comment.comment_id)}>
                                    {t('delete-comment')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && isRepliesVisible && (
                <div className='replies'>
                    {renderReplies(comment.replies)}
                </div>
            )}
        </div>
    );
};

export default Comment;
