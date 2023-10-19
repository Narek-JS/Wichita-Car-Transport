import { Container } from '@/components/ui/container';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PostCard } from '@/components/PostCard';
import { ButtonUI } from '@/components/ui/ButtonUI';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { useLocalStorageListener } from '@/hooks/useLocalStorageListener';
import { Redirect } from '@/components/Redirect';
import { usePagination } from '@/hooks/usepagination';
import { useAppSelector } from '@/store/hooks';
import { selectMenus } from '@/store/manu';
import { BannerPost } from './BannerPost';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { useGetLatestPostsApiQuery } from '@/store/posts/latestPosts';
import { useGetPostsApiQuery } from '@/store/posts/posts';
import { useScrollToView } from '@/hooks/useScrollToView';
import classes from './index.module.css';
import Link from 'next/link';

type CategoryT = 'news' | 'blogs';

const Posts = () => {
    const { query, pathname } = useRouter();
    const { data: menu } = useAppSelector(selectMenus);

    const postCategoryId: 1 | 2 = pathname.includes('news') ? 1 : 2;
    const [postCategory, latestPostCategory]: Array<CategoryT> = pathname.includes('news') ? ['news', 'blogs'] : ['blogs', 'news'];
    
    const [ posts, setPosts ] = useState<undefined | Record<string, any>>();
    const [ errorPosts, setErrorPosts ] = useState<any>(false);
    const { currentPage, goToPage, nextPage, prevPage, getVisiblePages } = usePagination(posts?.pageCount || 1, Number(query.page) || 1);

    const { data, error, isLoading } = useGetPostsApiQuery(`category?slug=${postCategory}&page=${currentPage}`);
    const { data: dataLatestPosts } = useGetLatestPostsApiQuery(`getLast2Data?category=${postCategoryId}&limit=4`);

    const sectionRef = useScrollToView<HTMLDivElement>();

    useLocalStorageListener('page', (newValue: any) => {
        const pageParam = newValue ? Number(newValue) : 1;
        goToPage(pageParam);
    });

    useEffect(() => {
        if(error && errorPosts === false) {
            setErrorPosts(error);
        };
    }, [error]);

    useEffect(() => {
        if(data !== undefined && isLoading === false) {
            setPosts(data);
            localStorage.setItem('page', String(currentPage));
        };
    }, [data]);

    if(errorPosts) return <Redirect to='404' />

    if(isLoading || menu === null) return <LoadingUI type='fullPage'/>;
    
    return (
        <section className={classes.postsSection} ref={sectionRef}>
            <Container>
                <BannerPost {...posts?.data?.[0]}/>
                <div className={classes.wrapperPosts}>
                    { data?.data && data.data.slice(1, Math.floor(data?.data.length / 2)).map((post, index) => (
                        <PostCard
                            categoryName={post.categoryName}
                            date={post?.date || ''}
                            title={post?.title || ''}
                            description={post?.description || ''}
                            imagePath={post?.imagePath || ''}
                            url={post?.url || ''}
                            key={post?.id}
                        />
                    ))}
                </div>
            </Container>
            <div className={classes.latstBlocks}>
                <Container>
                    <div className={classes.content}>
                        <div className={classes.firstLine}>
                            <p>Explore Our {latestPostCategory} Section</p>
                            <Link href={`/${latestPostCategory}`}><ArrowRightRed /> More {latestPostCategory}</Link>
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
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className={classes.wrapperPosts}>
                    { posts?.data?.slice(Math.floor(posts?.data?.length / 2), posts?.data?.length).map((post, index) => (
                        <PostCard
                            categoryName={post.categoryName}
                            date={post?.date || ''}
                            title={post?.title || ''}
                            description={post?.description || ''}
                            imagePath={post?.imagePath || ''}
                            url={post?.url || ''}
                            key={post?.id}
                        />
                    ))}
                </div>
            </Container>
            <Container>
                <div className={classes.paginationBtns}>
                    <ButtonUI
                        classN='border-dashed-trans'
                        text='Previous'
                        hendlechange={prevPage}
                    />
                    { getVisiblePages().map((pageNumber) => (
                        <ButtonUI
                            key={pageNumber}
                            classN={currentPage === pageNumber ? 'border-dashed-trans-active' : 'border-dashed-trans'  }
                            text={String(pageNumber)}
                            hendlechange={() => goToPage(pageNumber)}
                        />
                    ))}
                    <ButtonUI
                        classN='border-dashed-trans'
                        text='Next'
                        hendlechange={nextPage}
                    />
                </div>
            </Container>
        </section>
    );
};

export { Posts };