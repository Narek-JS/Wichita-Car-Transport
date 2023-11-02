import { AnonymousIcon } from '@/public/assets/svgs/AnonymousIcon';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { useState, useMemo } from 'react';
import { getTimeAgo } from '@/helper/time';

import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
    comment: Array<Record<string, any>>;
};

const Responses: React.FC<IProps> = ({ comment }) => {
    const [isOpenAllComment, setIsOpenAllComment] = useState(false);

    const getCommentsJSX = (start: number = 0, end: number = 4) => (
        comment.slice(start, end).map(responseItem => (
            <div key={responseItem.id} className={classes.responseItem}>
                <div className={classes.responseUser}>
                    <div className={classes.responseUserImg}>
                        <AnonymousIcon />
                    </div>

                    <div>
                        <p>{responseItem.name}</p>
                        <span>{getTimeAgo(responseItem.created_at)}</span>
                    </div>
                </div>

                <p>{responseItem.comments}</p>
            </div>
        ))
    );

    const initialComments = useMemo(getCommentsJSX, []);
    const restComments = useMemo(() => getCommentsJSX(4, comment.length), []);
    
    return (
        <div className={classes.responses}>
            <h2 className={classes.responsesTitle}>
                <p>Responses ({comment.length})</p>
            </h2>

            <div className={classes.wrapperComments}>
                {initialComments}

                <div className={classNames(classes.wrapperComments, {
                    [classes.openAllComments]: isOpenAllComment
                })}>
                    {isOpenAllComment && restComments}
                </div>
            </div>

            <p className={classes.reaMoreResponse} onClick={() => setIsOpenAllComment(!isOpenAllComment)}>
                <ArrowRightRed rotate={isOpenAllComment ? 180 : 0} />
                <span>Read { isOpenAllComment ? 'Less' : 'More' } Comments</span>
            </p>
        </div>
    );
};

export { Responses };