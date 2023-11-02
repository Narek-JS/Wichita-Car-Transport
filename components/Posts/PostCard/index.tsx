import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { formatDate } from '@/helper/time';
import Link from 'next/link';
import Image from 'next/image';
import classes from './index.module.css';

interface IProps {
    category: 'blogs' | 'news';
    time: string;
    title: string;
    description: string;
    image: string;
    slug: string;
};

const PostCard: React.FC<IProps> = ({
    category,
    description,
    image,
    time,
    title,
    slug
}) => {

    return (
        <div className={classes.postCard}>
            <Link href={'/' + slug}>
                <Image
                    src={image}
                    alt="hero background image"
                    className={classes.postCardImage}
                    width={999}
                    height={999}
                />
            </Link>
            <div className={classes.postCardContent}>
                <p className={classes.category}>{category}</p>
                <h3 className={classes.postCardTitle}>{title}</h3>
                <div className={classes.time}>
                    <DateIcon />
                    <p>{formatDate(time)}</p>
                </div>
                <p className={classes.description} dangerouslySetInnerHTML={{ __html: description }} />
                <Link href={'/' + slug} className={classes.seeDitails}> Continue Reading <ArrowIcon rotate={-90}/> </Link>
            </div>
        </div>
    );
};

export { PostCard }