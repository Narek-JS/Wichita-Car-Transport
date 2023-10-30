import { useLocalStorageListener } from '@/hooks/useLocalStorageListener';
import { useGetPostsApiQuery } from '@/store/posts/posts';
import { useScrollToView } from '@/hooks/useScrollToView';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { Container } from '@/components/ui/container';
import { usePagination } from '@/hooks/usepagination';
import { ButtonUI } from '@/components/ui/ButtonUI';
import { PostCard } from '@/components/PostCard';
import { Redirect } from '@/components/Redirect';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { LatestPosts } from './LatestPosts';
import { selectMenus } from '@/store/manu';
import { BannerPost } from './BannerPost';
import { useRouter } from 'next/router';
import classes from './index.module.css';

type CategoryT = 'news' | 'blogs';

const Posts = () => {
    const { query, pathname } = useRouter();
    const { data: menu } = useAppSelector(selectMenus);
    const [ posts, setPosts ] = useState<undefined | Record<string, any>>();
    const [ errorPosts, setErrorPosts ] = useState<any>(false);
    const { currentPage, goToPage, nextPage, prevPage, getVisiblePages } = usePagination(posts?.pageCount || 1, Number(query.page) || 1);
    
    const postCategory: CategoryT = pathname.includes('news') ? 'news' : 'blogs';
    const { data, error, isLoading } = useGetPostsApiQuery(`category?slug=${postCategory}&page=${currentPage}`);

    const sectionRef = useScrollToView<HTMLDivElement>();

    useLocalStorageListener('page', (newValue: any) => {
        const pageParam = newValue ? Number(newValue) : 1;
        goToPage(pageParam);
    });

    useEffect(() => {
        if(error) { setErrorPosts(error) };
    }, [error]);

    useEffect(() => {
        if(data !== undefined && isLoading === false) {
            setPosts(data);
            localStorage.setItem('page', String(currentPage));
        };
    }, [data]);

    if(errorPosts) return <Redirect to='404' />;

    if(isLoading || menu === null) return <LoadingUI type='fullPage'/>;
    
    return (
        <section className={classes.postsSection} ref={sectionRef}>
            <Container>
                <BannerPost {...posts?.data?.[0]} />
                <div className={classes.wrapperPosts}>
                    { data?.data && data.data.map(post => (
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
            <LatestPosts />
        </section>
    );
};

export { Posts };