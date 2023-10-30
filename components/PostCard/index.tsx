import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { formatDate } from '@/helper/time';
import Link from 'next/link';
import Image from 'next/image';
import classes from './index.module.css';

interface IProps {
    imagePath: string,
    categoryName: string,
    title: string;
    description: string,
    date: string,
    url: string
};

const PostCard: React.FC<IProps> = ({
    imagePath,
    categoryName,
    title,
    description,
    date,
    url
}) => {
    return (
        <div className={classes.card}>
            <div className={classes.wrapperImage}>
                <Link className={classes.bg} href={url}/>
                    <Image
                        src={imagePath}
                        alt="post image"
                        className={classes.image}
                        width={390}
                        height={240}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200) 50vw, 33vw'
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
                <p
                    className={classes.description}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
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