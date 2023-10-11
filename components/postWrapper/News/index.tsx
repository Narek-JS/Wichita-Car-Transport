import { Container } from '@/components/ui/container';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getLatestBlogsBlog, getNews } from '@/constants/service';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { ButtonUI } from '@/components/ui/ButtonUI';
import { useLocalStorageListener } from '@/hooks/useLocalStorageListener';
import { Redirect } from '@/components/Redirect';
import { usePagination } from '@/hooks/usepagination';
import { useAppSelector } from '@/store/hooks';
import { selectMenus } from '@/store/manu';
import { BannerPost } from '../BannerPost';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';
import classes from './index.module.css';


const News = () => {
    const router = useRouter();
    const { query } = router;
    const [ news, setNews ] = useState<undefined | Record<string, any>>(undefined);
    const [ errorNews, setErrorNews ] = useState<any>(false);
    const { currentPage, goToPage, nextPage, prevPage, getVisiblePages } = usePagination(news?.data?.pageCount || 1, Number(query.page) || 1);
    const { isLoading, data, error } = useQuery(
        ['news', currentPage],
        getNews(currentPage),
        { enabled: errorNews === false }
    );
    const { data: dataLatestNews } = useQuery<Record<string, any> | any>('latestBlogs', getLatestBlogsBlog(4));

    const { data: menu } = useAppSelector(selectMenus);

    useLocalStorageListener('page', (newValue: any) => {
        const pageParam = newValue ? Number(newValue) : 1;
        goToPage(pageParam);
    });

    useEffect(() => {
        error && errorNews === false && setErrorNews(error);
    }, [error]);

    useEffect(() => {
        if(data !== undefined && isLoading === false) {
            setNews(data);
            localStorage.setItem('page', String(currentPage));
        };
    }, [data]);

    if(errorNews) return <Redirect to='404' />

    if(isLoading || !data) return <LoadingUI type='fullPage'/>

    return (
        <section className={classes.newsSection}>
            <Container>
                <BannerPost category='news' post={news?.data?.posts[1]}/>
                <div className={classes.wrapperNews}>
                    { news?.data?.posts.slice(0, Math.floor(news?.data?.posts.length / 2)).map((_new) => (
                        <PostCard
                            categoryName='news'
                            key={_new.id}
                            date={_new.created_at}
                            title={_new.slug}
                            description={_new.body}
                            imagePath={_new.image}
                            url={_new.slug}
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
                <div className={classes.wrapperNews}>
                    { news?.data?.posts.slice(Math.floor(news?.data?.posts.length / 2), news?.data?.posts.length).map((_new) => (
                        <PostCard
                            categoryName='news'
                            key={_new.id}
                            date={_new.created_at}
                            title={_new.slug}
                            description={_new.body}
                            imagePath={_new.image}
                            url={_new.slug}
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

export default News;