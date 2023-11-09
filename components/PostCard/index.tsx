import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { formatDate } from '@/helper/time';
import { Skeleton } from '@mui/material';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
    parentCssObject?: {
        readonly [key: string]: string;
    },
    imagePath: string,
    categoryName: string,
    title: string;
    description: string,
    date: string,
    url: string,
    lazyLoading?: boolean,
    priority?: boolean
};

const PostCard: React.FC<IProps> = ({
    parentCssObject,
    categoryName,
    description,
    lazyLoading,
    imagePath,
    title,
    date,
    url
}) => {
    const [ isLoad, setIsLoad ] = useState(false);

    const onLoad = () => {
        setIsLoad(true);
    };

    return (
        <div className={classNames(classes.card, {
            ...(parentCssObject && { [parentCssObject.card]: true })
        })}>
            <div className={classes.wrapperImage}>
                { isLoad && (
                    <Link className={classes.bg} href={url} />
                )}
                <Image
                    src={imagePath}
                    alt="post image"
                    className={classNames(classes.image, {
                        [classes.loadedImage]: isLoad
                    })}
                    onLoad={onLoad}
                    width={350}
                    height={240}
                    quality={10}
                    {...(lazyLoading && { loading:'lazy' })}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200) 50vw, 33vw'
                />
                { !isLoad && (
                    <Skeleton
                        sx={{ bgcolor: 'rgba(0, 83, 121, 0.5)', transform: 'translateY(-210px)' }}
                        variant="rectangular"
                        height={210}
                    />
                )}
            </div>
            <div className={classes.content}>
                <div className={classes.firstList}>
                    <p className={classes.categoryName}>{categoryName}</p>
                    <p className={classes.date}>
                        <DateIcon />
                        <span>{formatDate(date)}</span>
                    </p>
                </div>
                <p className={classes.title}>{title}</p>
                {description && 
                    <p
                        className={classes.description}
                        dangerouslySetInnerHTML={{ __html: description.slice(0, 200) }}
                    />
                }
                <Link href={url} className={classes.link}>
                    <span className={classes.readMore}>
                        <ArrowRightRed />
                        Continue Reading
                    </span>
                </Link>
            </div>
        </div>
    );
};

export { PostCard };