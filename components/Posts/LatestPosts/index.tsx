import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { useGetLatestPostsApiQuery } from '@/store/posts/latestPosts';
import { Container } from '@/components/ui/container';
import { PostCard } from '@/components/PostCard';
import { useRouter } from 'next/router';
import { memo } from 'react';
import Link from 'next/link';
import classes from './index.module.css';

const LatestPosts: React.FC = memo(() => {
    const { pathname } = useRouter();

    const latestPostCategory = pathname.includes('news') ? 'blogs' : 'news';
    const postCategoryId: 1 | 2 = pathname.includes('news') ? 1 : 2;

    const { data: dataLatestPosts } = useGetLatestPostsApiQuery(`getLast2Data?category=${postCategoryId}&limit=4`);

    return (
        <div className={classes.latstBlocks}>
            <Container>
                <div className={classes.content}>
                    <div className={classes.firstLine}>
                        <p>Explore Our {latestPostCategory} Section</p>
                        <Link href={`/${latestPostCategory}`}>
                            <ArrowRightRed /> 
                            More {latestPostCategory}
                        </Link>
                    </div>
                    <div className={classes.contentBlocks}>
                        { dataLatestPosts?.[latestPostCategory]?.map((post) => (
                            <PostCard
                                categoryName={post.categoryName}
                                date={post?.date || ''}
                                title={post?.title || ''}
                                description={post?.description || ''}
                                imagePath={post?.imagePath || ''}
                                url={post?.url || ''}
                                key={post?.id}
                                priority={true}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </div>    
    );
});

export { LatestPosts };