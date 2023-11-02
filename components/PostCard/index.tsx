import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { formatDate } from '@/helper/time';
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
    imagePath,
    categoryName,
    title,
    description,
    date,
    url,
    lazyLoading,
    priority
}) => {
    return (
        <div className={classNames(classes.card, {
            ...(parentCssObject && { [parentCssObject.card]: true })
        })}>
            <div className={classes.wrapperImage}>
                <Link className={classes.bg} href={url}/>
                    <Image
                        src={imagePath}
                        alt="post image"
                        className={classes.image}
                        width={390}
                        height={240}
                        quality={10}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200) 50vw, 33vw'
                        {...(lazyLoading && { loading: 'lazy' })}
                        {...(priority && { priority: true })}
                        
                    />
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