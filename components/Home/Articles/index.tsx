import { Container } from '@/components/ui/container';
import { PostCard } from '@/components/PostCard';
import { useGetLatestPostsApiQuery } from '@/store/posts/latestPosts';
import classes from './index.module.css';
import useWindowSize from '@/hooks/useWindowSize';

const Articles: React.FC = () => {
    const { width } = useWindowSize();
    const { data: latestPosts } = useGetLatestPostsApiQuery('getLast2Data?category=0&limit=2');

    if(Number(width) <= 991) return null;

    return (
        <section className={classes.articlesSection}>
            <Container>
                <p className={classes.subTitle}>
                    Our Articles
                </p>
                <div className={classes.content}>
                    <div className={classes.blogs}>
                        <p className={classes.title}>LATEST BLOGS</p>
                        <div className={classes.flex}>
                            { latestPosts?.blogs.map((post) => (
                                <PostCard {...post} />
                            ))}
                        </div>
                    </div>
                    <div className={classes.news}>
                        <p className={classes.title}>LATEST NEWS</p>
                        <div className={classes.flex}>
                            { latestPosts?.news.map((post) => (
                                <PostCard {...post} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { Articles };