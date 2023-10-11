import Image from 'next/image';
import classes from './index.module.css';
import Link from 'next/link';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { CalendarIcon } from '@/public/assets/svgs/CalendarIcon';
import { formatDate } from '@/helper/time';

interface IProps {
    post: any;
    category: 'blog' | 'news'
};

const BannerPost: React.FC<IProps> = ({ post, category }) => {

    return (
        <div className={classes.bannerPost}>
            <h1 className={classes.title}>
                Dive into Engaging Blog Posts
            </h1>
            <div className={classes.content}>
                <Image
                    src={post?.image || ''}
                    alt='Banner Post image'
                    className={classes.image}
                    width={973}
                    height={600}
                />
                <div className={classes.postData}>
                    <div className={classes.firstLine}>
                        <p className={classes.latestText}>
                            Latest { category === 'blog' ? 'Blog' : 'News'}
                        </p>
                        <p className={classes.date}>
                            <CalendarIcon />
                            <span>{formatDate(post?.updated_at)}</span>
                        </p>
                    </div>
                    <h3 className={classes.subTitle}>{post?.title}</h3>
                    <p className={classes.description} dangerouslySetInnerHTML={{ __html: post?.body }}/>
                    <Link href={post?.slug || ''} className={classes.link}>
                        <ArrowRightRed />
                        Continue Reading
                    </Link>
                </div>
            </div>
        </div>
    );
};

export  { BannerPost };