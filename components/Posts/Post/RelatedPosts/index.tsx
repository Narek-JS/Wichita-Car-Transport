import { IRelatedPost } from '@/model/dynamicPage';
import { PostCard } from '@/components/PostCard';
import classes from './index.module.css';

interface IProps {
    relatedPosts: Array<IRelatedPost>;
};

const RelatedPosts: React.FC<IProps> = ({ relatedPosts }) => {

    return (
        <div className={classes.wrapperRelatedPosts}>
            <h2 className={classes.relatedPostsTitle}>
                <span>You Might Also Like</span>
            </h2>
            <div className={classes.posts}>
                { [...relatedPosts, ...relatedPosts,...relatedPosts, ...relatedPosts].slice(0, 4).map(post => (
                     <PostCard
                        parentCssObject={classes}
                        categoryName={post.categoryName}
                        date={post?.date || ''}
                        title={post?.title || ''}
                        description={''}
                        imagePath={post?.image || ''}
                        url={post?.slug || ''}
                        key={post?.id}
                        lazyLoading={true}
                    />
                ))}         
            </div>
        </div>
    )
};

export { RelatedPosts };