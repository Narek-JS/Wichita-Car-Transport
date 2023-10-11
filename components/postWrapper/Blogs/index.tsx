import { Container } from '@/components/ui/container';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PostCard } from '@/components/PostCard';
import { useQuery } from 'react-query'
import { ButtonUI } from '@/components/ui/ButtonUI';
import { getBlogs, getLatestNewsNew } from '@/constants/service';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { useLocalStorageListener } from '@/hooks/useLocalStorageListener';
import { Redirect } from '@/components/Redirect';
import { usePagination } from '@/hooks/usepagination';
import { useAppSelector } from '@/store/hooks';
import { selectMenus } from '@/store/manu';
import { BannerPost } from '../BannerPost';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import classes from './index.module.css';
import Link from 'next/link';

const Blogs = () => {
    const router = useRouter();
    const { query } = router;
    const [ blogs, setBlogs ] = useState<undefined | Record<string, any>>();
    const [ errorBlogs, setErrorBlogs ] = useState<any>(false);
    const { currentPage, goToPage, nextPage, prevPage, getVisiblePages } = usePagination(blogs?.data?.pageCount || 1, Number(query.page) || 1);
    const { isLoading, data, error } = useQuery(
        ['blogs', currentPage],
        getBlogs(currentPage),
        { enabled: errorBlogs === false }
    );
    const { data: dataLatestNews } = useQuery<Record<string, any> | any>('latestNews', getLatestNewsNew(4));
    const { data: menu } = useAppSelector(selectMenus);

    useLocalStorageListener('page', (newValue: any) => {
        const pageParam = newValue ? Number(newValue) : 1;
        goToPage(pageParam);
    });

    useEffect(() => {
        error && errorBlogs === false && setErrorBlogs(error);
    }, [error]);

    useEffect(() => {
        if(data !== undefined && isLoading === false) {
            setBlogs(data);
            localStorage.setItem('page', String(currentPage));
        };
    }, [data]);

    if(errorBlogs) return <Redirect to='404' />

    if(isLoading || menu === null) return <LoadingUI type='fullPage'/>;

    return (
        <section className={classes.blogsSection}>
            <Container>
                <BannerPost category='blog' post={blogs?.data?.posts[0]}/>
                <div className={classes.wrapperBlogs}>
                    { blogs?.data?.posts.slice(1, Math.floor(blogs?.data?.posts.length / 2)).map((blog, index) => (
                        <PostCard
                            categoryName='blogs'
                            date={blog?.created_at || ''}
                            title={blog?.slug || ''}
                            description={blog?.body || ''}
                            imagePath={blog?.image || ''}
                            url={blog?.slug || ''}
                            key={index}
                        />
                    ))}
                </div>
            </Container>
            <div className={classes.latstBlocks}>
                <Container>
                    <div className={classes.content}>
                        <div className={classes.firstLine}>
                            <p>Explore Our News Section</p>
                            <Link href='/news'><ArrowRightRed /> More news</Link>
                        </div>
                        <div className={classes.contentBlocks}>
                            { dataLatestNews?.data?.map((news, index) => (
                                <PostCard
                                    categoryName='news'
                                    date={news?.created_at || ''}
                                    title={news?.slug || ''}
                                    description={news?.body || ''}
                                    imagePath={news?.image || ''}
                                    url={news?.slug || ''}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className={classes.wrapperBlogs}>
                    { blogs?.data?.posts.slice(Math.floor(blogs?.data?.posts.length / 2), blogs?.data?.posts.length).map((blog, index) => (
                        <PostCard
                            categoryName='blogs'
                            date={blog?.created_at || ''}
                            title={blog?.slug || ''}
                            description={blog?.body || ''}
                            imagePath={blog?.image || ''}
                            url={blog?.slug || ''}
                            key={index}
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

export default Blogs;