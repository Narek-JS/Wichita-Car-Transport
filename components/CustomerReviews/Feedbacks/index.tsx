import { SmallStarIconReview } from '@/public/assets/svgs/SmallStarIconReview';
import { selectCustomerReviewsData } from '@/store/customerReviews';
import { DislikeIcon } from '@/public/assets/svgs/DislikeIcon';
import { LikeGreen } from '@/public/assets/svgs/LikeGreen';
import { Container } from '@/components/ui/container';
import { useAppSelector } from '@/store/hooks';

import React from 'react';
import classes from './index.module.css';

const Feedback: React.FC = () => {
    const reviews = useAppSelector(selectCustomerReviewsData).data;

    return (
        <section className={classes.section}>
            <Container>
                <div className={classes.reviewsGraph}>
                    <Container parentCssObject={classes}>
                        <div className={classes.overflowBlock}>
                            <div className={classes.content}>
                                { reviews?.feedbacks.map((feedback, index) => (
                                    <div className={classes.feedback} key={index}>
                                        <div className={classes.logo}>
                                            {feedback.name[0].toUpperCase()}
                                        </div>
                                        <div className={classes.contentdata}>
                                            <p className={classes.name}>{feedback.name}</p>
                                            <p className={classes.data}>
                                                { feedback.data.split(',').map((detail, index) => (
                                                    <span key={index}>{detail}<i>,</i></span>
                                                ))}
                                            </p>
                                            <p className={classes.time}>
                                                {[...Array(5)].map((_, index) => <SmallStarIconReview key={index} /> )}
                                                {feedback.time}
                                            </p>
                                            <p className={classes.description}>{feedback.feedback}</p>
                                        </div>
                                        
                                        <div className={classes.recommendation}>
                                            Recommendation:
                                            { feedback.recommendation ? <LikeGreen /> : <DislikeIcon color='red' size={14}/> }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </div>
            </Container>
        </section>
    );
};

export { Feedback };