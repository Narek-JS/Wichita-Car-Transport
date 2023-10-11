import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { formatDate } from '@/helper/time';
import Link from 'next/link';
import Image from 'next/image';
import classes from './index.module.css';

interface IProps {
    relatedPosts: Array<Record<string, any>>;
};

const RelatedPosts: React.FC<IProps> = ({ relatedPosts }) => {

    return (
        <div className={classes.wrapperRelatedPosts}>
            <h2 className={classes.relatedPostsTitle}>
                <ArrowIcon rotate={-90}/>
                <span>You Might Also Like</span>
            </h2>
            <div className={classes.posts}>
                { relatedPosts.map(post => (
                    <div className={classes.post} key={post.id}>
                        <Link href={'/' + post.slug}>
                            <Image
                                src={post.image}
                                alt="hero Blog image"
                                className={classes.postImage}
                                width={999}
                                height={360}
                            />
                        </Link>
                        <div className={classes.postContent}>
                            <div className={classes.wrapperTime}>
                                <DateIcon />
                                <span className={classes.defaultText}>{formatDate(post.category.created_at)}</span>
                                <span className={classes.verticalRow} />
                                <span className={classes.categoryName}>{post.category.name}</span>
                            </div>
                            <p className={classes.postDescription}>BMW: Better Makers Win – 20% Of Vehicles Electric For 2023</p>
                        </div>
                    </div>
                ))}         
            </div>
        </div>
    )
};

export { RelatedPosts };