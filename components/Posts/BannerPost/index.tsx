import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { CalendarIcon } from '@/public/assets/svgs/CalendarIcon';
import { formatDate } from '@/helper/time';
import { Skeleton } from '@mui/material';
import { IPost } from '@/model/posts';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import classes from './index.module.css';

const BannerPost: React.FC<IPost> = ({
    categoryName,
    date,
    description,
    imagePath,
    title,
    url
}) => {
    const [ isLoad, setIsLoad ] = useState(false);

    const onLoad = () => {
        setIsLoad(true);
        
    };

    return (
        <div className={classes.bannerPost}>
            <h1 className={classes.title}>
                Dive into Engaging { categoryName } Posts
            </h1>
            <div className={classes.content}>
                { imagePath &&
                    <div className={classes.wrapperImage}>
                        <Image
                            src={imagePath}
                            alt='Banner Post image'
                            className={classNames(classes.image, {
                                [classes.loadedImage]: isLoad
                            })}
                            onLoad={onLoad}
                            width={800}
                            height={550}
                            priority={true}
                            quality={0}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200) 50vw, 33vw'
                        />
                        { !isLoad &&
                            <Skeleton
                                sx={{ bgcolor: 'rgba(0, 83, 121, 0.5)', position: 'absolute', top: 0, left: 0}}
                                variant="rectangular"
                                height='100%'
                                width='100%'
                            />
                        }
                    </div>
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