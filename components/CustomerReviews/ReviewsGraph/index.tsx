import { Container } from '@/components/ui/container';
import { StarIcon } from '@/public/assets/svgs/StarIcon';
import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';

interface IProps {
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewsGraph: React.FC<IProps> = ({ setIsOpenForm }) => {
    const { width } = useWindowSize()
    const reviewPrecent = 4.8
    const presentation = [
        {
            id: 1,
            percent: 7
        },
        {
            id: 2,
            percent: 0
        },
        {
            id: 3,
            percent: 6
        },
        {
            id: 4,
            percent: 9
        },
        {
            id: 5,
            percent: 177
        }
    ];

    const toogleIsOpenForm = () => setIsOpenForm(prev => !prev);

    return (
        <section className={classes.section}>
            <Container>
                <div className={classes.reviewsGraph}>
                    <Container>
                        <div className={classes.content}>
                            <h2 className={classes.subTitle}>Our Customers Reviews</h2>
                            <div className={classes.reviewContent}>
                                <div className={classes.reviewContentSecondeBlock}>
                                    <div className={classes.estimate} >
                                        <p className={classes.estimateDiscuss}>{reviewPrecent} / 5</p>
                                        <p className={classes.wrapperStars}>
                                            { new Array(5).fill('').map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    {...((5 - Math.floor(5 / reviewPrecent)) === i && { precent: (5 - reviewPrecent) * 100})}
                                                />
                                            ))}
                                        </p>
                                        <p className={classes.reviewQuantity}>199 Review</p>
                                    </div>
                                    <div className={classes.presentation}>
                                        { presentation.sort((a, b) => b.id - a.id).map(({ id, percent }) => (
                                            <div className={classes.percentList} key={id}>
                                                <span className={classes.percentId}>{id}</span>
                                                <StarIcon />
                                                <div className={classes.percentWrapper}>
                                                    <span
                                                        className={classes.percentActive}
                                                        style={{width: `${percent * 100 / 200}%`}}
                                                    />
                                                </div>
                                                <span className={classes.row}>|</span>
                                                <span className={classes.percent}>{percent}</span>
                                            </div>
                                        ))}
                                    </div>
                                    { Number(width) > 991 && 
                                        <div className={classes.buttons}>
                                            <button className={classes.feedbackBtn} onClick={toogleIsOpenForm}>Give us your feedback</button>
                                        </div>
                                    }
                                </div>
                                { Number(width) < 991 && 
                                    <div className={classes.buttons}>
                                        <button className={classes.feedbackBtn} onClick={toogleIsOpenForm}>Give us your feedback</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </Container>
                </div>  
            </Container>
        </section>
    );
};

export { ReviewsGraph };