import { Fragment } from 'react';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { formatDate } from '@/helper/time';
import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import Link from 'next/link';
import Image from 'next/image';
import classes from './index.module.css';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';

interface IProps {
    latestBlogs: Array<Record<string, any>>;
}

const LatestBlogs: React.FC<IProps> = ({ latestBlogs }) => {

    return (
        <div className={classes.latestBlogs}>
            <h2 className={classes.blogsTitle}>
                <ArrowRightRed />
                Latest Blogs
            </h2>
            <div className={classes.wrapperBlogCards}>
                { latestBlogs.map((blogs, index) => (
                    <Fragment key={blogs.id}>
                        {Boolean(index && latestBlogs.length - 1 === index) && (
                            <div className={classes.rowCardSpace} />
                        )}
                        <div className={classes.blogsCard}>
                            <Link href={`/${blogs.slug}`}>
                                <Image
                                    src={blogs.image}
                                    alt="news image"
                                    className={classes.blogsCardImg}
                                    width={999}
                                    height={340}
                                />
                            </Link>
                            <div className={classes.blogsCardContent}>
                                <div className={classes.viewAllSlice}>
                                    <div className={classes.calendarSlice}>
                                        <DateIcon />
                                        <span className={classes.defaultText}>{formatDate(blogs.created_at)}</span>
                                    </div>
                                    <p>Blogs</p>
                                </div>
                                <div className={classes.blogsCardBody} dangerouslySetInnerHTML={{ __html: blogs.body }} />
                                <div className={classes.between}>
                                    <Link href={`/${blogs.slug}`} className={classes.blogsCardReadMore}>
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

export { LatestBlogs };