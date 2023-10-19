import { Fragment } from 'react';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { formatDate } from '@/helper/time';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { IPosts } from '@/model/latestPosts';
import Link from 'next/link';
import Image from 'next/image';
import classes from './index.module.css';

type CategoryT = 'news' | 'blogs';

interface IProps {
    latestPosts: IPosts;
    latestPostCategory: CategoryT;
};


const LatestPosts: React.FC<IProps> = ({
    latestPosts,
    latestPostCategory
}) => {

    return (
        <div className={classes.latestPosts}>
            <h2 className={classes.postsTitle}>
                <ArrowRightRed />
                Latest { latestPostCategory }
            </h2>
            <div className={classes.wrapperPostCards}>
                { latestPosts?.[latestPostCategory].map((post, index) => (
                    <Fragment key={post.id}>
                        {Boolean(index && latestPosts?.[latestPostCategory].length - 1 === index) && (
                            <div className={classes.rowCardSpace} />
                        )}
                        <div className={classes.postsCard}>
                            <Link href={`/${post.url}`}>
                                <Image
                                    src={post.imagePath}
                                    alt={`${latestPostCategory} image`}
                                    className={classes.postsCardImg}
                                    width={999}
                                    height={340}
                                />
                            </Link>
                            <div className={classes.postsCardContent}>
                                <div className={classes.viewAllSlice}>
                                    <p>{latestPostCategory}</p>
                                    <div className={classes.calendarSlice}>
                                        <DateIcon />
                                        <span className={classes.defaultText}>{formatDate(post.date)}</span>
                                    </div>
                                </div>
                                <div className={classes.postsCardBody} dangerouslySetInnerHTML={{ __html: post.description }} />
                                <div className={classes.between}>
                                    <Link href={`/${post.key}`} className={classes.postsCardReadMore}>
                                        <ArrowRightRed />
                                        Continue Reading
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export { LatestPosts };