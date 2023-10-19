import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import { AnonymousIcon } from '@/public/assets/svgs/AnonymousIcon';
import { getTimeAgo } from '@/helper/time';
import classes from './index.module.css';

interface IProps {
    comment: Array<Record<string, any>>;
};

const Responses: React.FC<IProps> = ({ comment }) => {

    return (
        <div className={classes.responses}>
            <h2 className={classes.responsesTitle}>
                <ArrowIcon rotate={-90}/>
                <p>Responses ({comment.length})</p>
            </h2>
            { comment.map((responseItem) => (
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
            ))}
            <p className={classes.reaMoreResponse}>
                <span>Read More Comments</span>
                <ArrowIcon rotate={-90}/>
            </p>
        </div>
    )
};

export { Responses };