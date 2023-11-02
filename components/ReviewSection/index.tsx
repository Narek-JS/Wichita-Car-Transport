import { handleOpenForm, useGetCustomerReviewsQuery } from '@/store/customerReviews';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import { StarIcon } from '@/public/assets/svgs/StarIcon';
import { Container } from '@/components/ui/container';
import { IStarCounts } from '@/model/customerReviews';
import { LoadingUI } from '../ui/LoadingUI';
import { selectHome } from '@/store/home';
import { useRouter } from 'next/router';
import { Redirect } from '../Redirect';

import useWindowSize from '@/hooks/useWindowSize';
import classNames from 'classnames';
import Link from 'next/link';

import classes from './index.module.css';

const Presentation: React.FC<{ starCounts: Array<IStarCounts> }> = ({ starCounts }) => {
    const { width } = useWindowSize();

    if(Number(width) <= 1024) return null;

    return (
        <div className={classes.presentation}>
            { starCounts.map(({ id, percentCount, percent }) => (
                <div className={classes.percentList} key={id}>
                    <span className={classes.percentId}>{id}</span>
                    <StarIcon />
                    <div className={classes.percentWrapper}>
                        <span className={classes.percentActive} style={{width: `${percent}%`}} />
                    </div>
                    <span className={classes.row}>|</span>
                    <span className={classes.percent}>{percentCount}</span>
                </div>
            ))}
        </div>
    );
};

const ReviewSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const review = useAppSelector(selectHome).data?.review;

    const { pathname } = useRouter();
    const { data: dataReviews, isError, isLoading } = useGetCustomerReviewsQuery('reviews');

    const handleOpenFeedbackForm = () => {
        dispatch(handleOpenForm());
    };

    if(isError) return <Redirect to='/404' />;

    return (
        <section className={classNames(classes.reviewSection, {
            [classes.mb30]: pathname === '/'
        })}>
            { isLoading && <LoadingUI type='fullPage' /> }
            <Container>
                <div className={classes.reviewContent}>
                    <div className={classes.descriptionWrapper}>
                        <h3 className={classes.titleOfDescription}>
                            Virginia Beach
                            <span>{review?.title.replace('Virginia Beach', '')}</span>
                        </h3>
                        <p className={classes.description}>
                            {review?.description}
                        </p>
                    </div>

                    <div className={classes.reviewContentSecondeBlock}>
                        <div className={classes.estimate} >
                            <p className={classes.estimateDiscuss}>{dataReviews?.reviewPercent} / 5</p>
                            <p className={classes.wrapperStars}>
                                { new Array(5).fill('').map((_, i) => (
                                    <StarIcon key={i} />
                                ))}
                            </p>
                            <p className={classes.reviewQuantity}>{dataReviews?.feedbacksLenght} Review</p>
                        </div>
                        
                        <Presentation starCounts={dataReviews?.starCounts || []} />

                        <div className={classes.buttons}>
                            <button className={classes.redMoreBtn} onClick={handleOpenFeedbackForm}>
                                <ArrowIcon />
                                <span> Read More </span>
                            </button>
                            <Link href='/customer-reviews' className={classes.feedbackBtn}>
                                Give us your feedback
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { ReviewSection };