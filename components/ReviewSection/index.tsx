import { Container } from '@/components/ui/container';
import { StarIcon } from '@/public/assets/svgs/StarIcon';
import { useRouter } from 'next/router';
import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import { useGetCustomerReviewsQuery } from '@/store/customerReviews';
import { selectHome } from '@/store/home';
import { useAppSelector } from '@/store/hooks';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import classNames from 'classnames';
import classes from './index.module.css';

const ReviewSection = () => {
    const { width } = useWindowSize();
    const { pathname } = useRouter();
    const { data: dataReviews } = useGetCustomerReviewsQuery('reviews');
    const review = useAppSelector(selectHome).data?.review;

    return (
        <section className={classNames(classes.reviewSection, {
            [classes.mb30]: pathname === '/'
        })}>
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
                                    <StarIcon
                                        key={i}
                                        {...((5 - Math.floor(5 / (dataReviews?.reviewPercent || 0))) === i && { precent: (5 - (dataReviews?.reviewPercent || 0)) * 100})}
                                    />
                                ))}
                            </p>
                            <p className={classes.reviewQuantity}>{dataReviews?.feedbacksLenght} Review</p>
                        </div>
                        { Boolean(Number(width) > 1024) && (
                            <div className={classes.presentation}>
                                { (dataReviews?.starCounts || [])?.map(({ id, percent }) => (
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
                        )}
                        <div className={classes.buttons}>
                            <button className={classes.redMoreBtn}>
                                <ArrowIcon />
                                <span> Read More </span>
                            </button>
                            <Link href='/customer-reviews' className={classes.feedbackBtn}>Give us your feedback</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { ReviewSection };