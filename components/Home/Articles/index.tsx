import { useGetLatestPostsApiQuery } from '@/store/posts/latestPosts';
import { Container } from '@/components/ui/container';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { PostCard } from '@/components/PostCard';
import { Redirect } from '@/components/Redirect';
import { useMemo } from 'react';

import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';

const Articles: React.FC = () => {
    const { width } = useWindowSize();
    const { data: latestPosts, isLoading, isError } = useGetLatestPostsApiQuery('getLast2Data?category=0&limit=2');
    
    const isTablet = Number(width) <= 991;

    const memorizeContent = useMemo(() => {
        if(isTablet) {
            return null;
        };

        return (
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
        );
    }, [latestPosts]);

    if(Number(width) <= 991) return null;
    if(isError) return <Redirect to='/404' />;

    return (
        <section className={classes.articlesSection}>
            { isLoading && <LoadingUI type='fullPage' /> }
            {memorizeContent}
        </section>
    );
};

export { Articles };