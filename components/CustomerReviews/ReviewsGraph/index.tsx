import { handleOpenForm, selectCustomerReviewsData } from '@/store/customerReviews';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { StarIcon } from '@/public/assets/svgs/StarIcon';
import { Container } from '@/components/ui/container';
import classes from './index.module.css';

const ReviewsGraph: React.FC = () => {
    const reviews = useAppSelector(selectCustomerReviewsData).data;
    const dispatch = useAppDispatch();

    const handleOpenFeedbackForm = () => {
        dispatch(handleOpenForm());
    };

    const sendFeetbackJSX = (
        <div className={classes.buttons}>
            <button className={classes.feedbackBtn} onClick={handleOpenFeedbackForm}>
                Give us your feedback
            </button>
        </div>
    );

    return (
        <section className={classes.section}>
            <Container>
                <div className={classes.reviewsGraph}>
                    <Container parentCssObject={classes}>
                        <div className={classes.content}>
                            <h2 className={classes.subTitle}>Our Customers Reviews</h2>
                            <div className={classes.reviewContent}>
                                <div className={classes.reviewContentSecondeBlock}>
                                    <div className={classes.estimate} >
                                        <p className={classes.estimateDiscuss}>{reviews?.reviewPercent} / 5</p>
                                        <p className={classes.wrapperStars}>
                                            { new Array(5).fill('').map((_, i) => (
                                                <StarIcon key={i} />
                                            ))}
                                        </p>
                                        <p className={classes.reviewQuantity}>{reviews?.feedbacksLenght} Review</p>
                                    </div>
                                    <div className={classes.presentation}>
                                        { reviews?.starCounts.map(({ id, percentCount, percent }) => (
                                            <div className={classes.percentList} key={id}>
                                                <span className={classes.percentId}>{id}</span>
                                                <StarIcon />
                                                <div className={classes.percentWrapper}>
                                                    <span
                                                        className={classes.percentActive}
                                                        style={{width: `${percent}%`}}
                                                    />
                                                </div>
                                                <span className={classes.row}>|</span>
                                                <span className={classes.percent}>{percentCount}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {sendFeetbackJSX}
                                </div>
                                {sendFeetbackJSX}
                            </div>
                        </div>
                    </Container>
                </div>  
            </Container>
        </section>
    );
};

export { ReviewsGraph };