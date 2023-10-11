import React from 'react';
import { Container } from '@/components/ui/container';
import { LikeGreen } from '@/public/assets/svgs/LikeGreen';
import { SmallStarIconReview } from '@/public/assets/svgs/SmallStarIconReview';

import classes from './index.module.css';

interface IProps {
    feedbacks?: Array<any>;
};

const Feedback: React.FC<IProps> = ({ feedbacks }) => {
    const feedbacksTest = [
        {
            name: 'Jacob Krawczyk',
            data: 'Transported: 2013 Ford F150, From: Eaton Rapids, MI To: Homosassa, FL',
            time: '3 hours ago',
            feedback: 'Shipped my vehicle promptly and was informed the whole trip with my vehicle',
            recommendation: true
        },
        {
            name: 'Jacob Krawczyk',
            data: 'Transported: 2013 Ford F150, From: Eaton Rapids, MI To: Homosassa, FL',
            time: '3 hours ago',
            feedback: 'Shipped my vehicle promptly and was informed the whole trip with my vehicle',
            recommendation: true
        },
        {
            name: 'Jacob Krawczyk',
            data: 'Transported: 2013 Ford F150, From: Eaton Rapids, MI To: Homosassa, FL',
            time: '3 hours ago',
            feedback: 'Shipped my vehicle promptly and was informed the whole trip with my vehicle',
            recommendation: true
        }
    ]
    return (
        <section className={classes.section}>
            <Container>
                <div className={classes.reviewsGraph}>
                    <Container>
                        <div className={classes.content}>
                            { feedbacksTest.map((feedback, index) => (
                                <div className={classes.feedback} key={index}>
                                    <div className={classes.logo}>
                                        {feedback.name[0].toUpperCase()}
                                    </div>
                                    <div className={classes.contentdata}>
                                        <p className={classes.name}>{feedback.name}</p>
                                        <p className={classes.data}>{feedback.data}</p>
                                        <p className={classes.time}>
                                            {[...Array(5)].map((_, index) => <SmallStarIconReview key={index} /> )}
                                            {feedback.time}
                                        </p>
                                        <p className={classes.description}>{feedback.feedback}</p>
                                    </div>
                                    { feedback.recommendation && (
                                        <div className={classes.recommendation}>
                                            Recommendation:
                                            <LikeGreen />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </Container>
        </section>
    );
};

export { Feedback };