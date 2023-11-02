import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { CalendarIcon } from '@/public/assets/svgs/CalendarIcon';
import { formatDate } from '@/helper/time';
import { IPost } from '@/model/posts';

import Image from 'next/image';
import Link from 'next/link';
import classes from './index.module.css';

const BannerPost: React.FC<IPost> = ({
    categoryName,
    date,
    description,
    imagePath,
    title,
    url
}) => {

    return (
        <div className={classes.bannerPost}>
            <h1 className={classes.title}>
                Dive into Engaging { categoryName } Posts
            </h1>
            <div className={classes.content}>
                { imagePath &&
                    <Image
                        src={imagePath}
                        alt='Banner Post image'
                        className={classes.image}
                        width={800}
                        height={550}
                        priority={true}
                        quality={0}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200) 50vw, 33vw'
                    />
                }
                <div className={classes.postData}>
                    <div className={classes.firstLine}>
                        <p className={classes.latestText}>
                            Latest { categoryName }
                        </p>
                        <p className={classes.date}>
                            <CalendarIcon />
                            <span>{formatDate(date)}</span>
                        </p>
                    </div>
                    <h3 className={classes.subTitle}>{title}</h3>
                    { description &&
                        <p
                            className={classes.description}
                            dangerouslySetInnerHTML={{ __html: description.slice(0, 200) }}
                        />
                    }
                    <Link href={url || ''} className={classes.link}>
                        <ArrowRightRed />
                        Continue Reading
                    </Link>
                </div>
            </div>
        </div>
    );
};

export  { BannerPost };