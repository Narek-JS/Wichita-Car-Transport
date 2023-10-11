import { Container } from '@/components/ui/container';
import { StarIcon } from '@/public/assets/svgs/StarIcon';
import { useRouter } from 'next/router';
import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import classNames from 'classnames';
import classes from './index.module.css';

const reviewPrecent = 4.8; 

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

const ReviewSection = () => {
    const { width } = useWindowSize();
    const { pathname } = useRouter();

    return (
        <section className={classNames(classes.reviewSection, {
            [classes.mb30]: pathname === '/'
        })}>
            <Container>
                <div className={classes.reviewContent}>
                    <div className={classes.descriptionWrapper}>
                        <h3 className={classes.titleOfDescription}>Virginia Beach <span>Car Transport Review</span></h3>
                        <p className={classes.description}>Lorem ipsum dolor sit amet consectetur. Cursus tortor amet porta condimentum auctor curabitur et. Ipsum hac vitae urna egestas vitae eget.  Cursus tortor amet porta condimentum auctor curabitur et. Ipsum hac vitae urna egestas vitae eget.Cursus tortor amet porta condimentum auctor curabitur et</p>
                    </div>
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
                        { Boolean(Number(width) > 1024) && (
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
                        )}
                            <div className={classes.buttons}>
                                <button className={classes.redMoreBtn}><ArrowIcon /> Read More</button>
                                <Link href='/customer-reviews' className={classes.feedbackBtn}>Give us your feedback</Link>
                            </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { ReviewSection };