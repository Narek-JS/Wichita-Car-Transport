import { Container } from '@/components/ui/container';
import { Fragment, useRef, useState } from 'react';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { FbSmollOrangeIcon } from '@/public/assets/svgs/FbSmollOrangeIcon';
import { TwitterIconSmollOrangeIcon } from '@/public/assets/svgs/TwitterIconSmollOrangeIcon';
import { LinkdinIconSmallOrange } from '@/public/assets/svgs/LinkdinIconSmallOrange';
import { GmailSmallIconOrange } from '@/public/assets/svgs/GmailSmallIconOrange';
import { formatDate } from '@/helper/time';
import { Responses } from './Responses';
import { LatestBlogs } from './LatestBlogs';
import { RelatedPosts } from './RelatedPosts';
import { Comment } from './Comment';
import { useQuery } from 'react-query';
import { getLatestBlogsBlog } from '@/constants/service';
import { LINKS_FROM_MENU_TITLES } from '@/constants/words';
import { useAppSelector } from '@/store/hooks';
import { selectMenus } from '@/store/manu';
import { LikeBtnIconPost } from '@/public/assets/svgs/LikeBtnIconPost';
import { CommentIcon } from '@/public/assets/svgs/CommentIcon';
import { LikePostIcon } from '@/public/assets/svgs/LikePostIcon';
import {
    FacebookShareButton,
    TwitterShareButton, 
    PinterestShareButton,
    LinkedinShareButton
} from 'next-share';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import classes from './index.module.css';
import classNames from 'classnames';

interface Iprops {
    data: Record<string, any>;
    slug: string;
};

const CurrentNew: React.FC<Iprops> = ({ data, slug }) => {
    const { data: dataLatestNews } = useQuery<Record<string, any> | any>('latestNews', getLatestBlogsBlog(2));
    const { data: menu } = useAppSelector(selectMenus);
    const commentCountRef = useRef(Math.floor(Math.random() * 10));
    const initialLikeCountRef = useRef<number>(new Date(data?.post?.updated_at).getDay() || Math.floor(Math.random() * 10));
    const [ likeCount, setLikeCount ] = useState<number | null>(initialLikeCountRef.current);

    if(!data) return null;

    return (
        <Fragment>
            <Head>
                <title key={1}>{menu?.contactInfo?.[LINKS_FROM_MENU_TITLES.blogs].title} | Wichita Car Transport CRM New</title>,
                <meta key={2}
                    property="og:title"
                    data-hid="og:title"
                    data-n-head="ssr"
                    content={`Wichita Car Transport Website ${menu?.contactInfo?.[LINKS_FROM_MENU_TITLES.blogs].title}`}
                ></meta>
            </Head>
            <section className={classes.mt160}>
                <Container>
                    <div className={classes.newSection}>
                        <div className={classes.newContent}>
                            <h1 className={classes.title}>
                                <Link href={menu?.contactInfo?.[LINKS_FROM_MENU_TITLES.news].url || ''}>
                                    {menu?.contactInfo?.[LINKS_FROM_MENU_TITLES.news].title}
                                </Link>
                            </h1>
                            <div className={classes.wrapperImage}>
                                <Image
                                    src={data.post.image}
                                    alt="hero New image"
                                    className={classes.newImage}
                                    width={780}
                                    height={520}
                                />
                                <div className={classes.wrapperSocial}>
                                    <div className={classes.calendarSlice}>
                                        <DateIcon />
                                        <span className={classes.defaultText}>{formatDate(data.post.created_at)}</span>
                                        <div className={classes.verticalRow}/>
                                        <span className={classes.calendarSliceNewText}>
                                            <Link href={menu?.contactInfo?.[LINKS_FROM_MENU_TITLES.news].url || ''}>{menu?.contactInfo?.[LINKS_FROM_MENU_TITLES.news].title}</Link>
                                        </span>
                                        <div className={classes.comments}>
                                            <CommentIcon />
                                            <span>{commentCountRef.current}</span>
                                        </div>
                                        <div className={classes.likeCount}>
                                            <LikePostIcon />
                                            <span>{likeCount}</span>
                                        </div>
                                    </div>
                                    <div className={classes.socialSlice}>
                                        <span className={classes.shareText}>Share</span>
                                        <FacebookShareButton url='https://www.facebook.com/ColumbusCarTransport'>
                                            <FbSmollOrangeIcon />
                                        </FacebookShareButton>
                                        <TwitterShareButton url='https://twitter.com/ColumbusCarTRSP'>
                                            <TwitterIconSmollOrangeIcon /> 
                                        </TwitterShareButton>
                                        <LinkedinShareButton url='https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.columbusautotransport.com%2Fstate-budget-considered-on-better-school-safety%2F'>
                                            <LinkdinIconSmallOrange />
                                        </LinkedinShareButton>
                                        <PinterestShareButton
                                            url='https://www.pinterest.com/columbuscartransport'
                                            media='next-share is a social share buttons for your next React apps.'
                                        >
                                            <GmailSmallIconOrange />
                                        </PinterestShareButton>
                                        <div
                                            className={classNames(classes.like, { [classes.aktiveLike]: initialLikeCountRef.current !== likeCount })}
                                            onClick={() => {
                                                setLikeCount(
                                                    likeCount === initialLikeCountRef.current ?
                                                        initialLikeCountRef.current + 1 :
                                                        initialLikeCountRef.current
                                                );
                                            }}
                                        >
                                            <LikeBtnIconPost />
                                            <span>Like</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.newBody}>
                                <p dangerouslySetInnerHTML={{ __html: data.post.body }}/>
                            </div>
                        </div>
                        { dataLatestNews?.data && <LatestBlogs latestBlogs={dataLatestNews.data}/>}
                    </div>
                </Container>
            </section>
            { Boolean(data.post.comment && data.post.comment.length) && (
                <section>
                    <Container>
                        <Responses comment={data.post.comment} />
                    </Container>
                </section>
            )}
            <section>
                <Container>
                    <div className={classes.relatedPosts}>
                        { Boolean(data.relatedPosts.length) && (
                            <RelatedPosts relatedPosts={data.relatedPosts}/>
                        )}
                        <Comment />
                    </div>
                </Container>
            </section>
        </Fragment>
    );
};

export { CurrentNew };