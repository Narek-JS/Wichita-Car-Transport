import { FacebookShareButton, TwitterShareButton, PinterestShareButton, LinkedinShareButton } from 'next-share'
import { TwitterIconSmollOrangeIcon } from '@/public/assets/svgs/TwitterIconSmollOrangeIcon';
import { LinkdinIconSmallOrange } from '@/public/assets/svgs/LinkdinIconSmallOrange';
import { GmailSmallIconOrange } from '@/public/assets/svgs/GmailSmallIconOrange';
import { FbSmollOrangeIcon } from '@/public/assets/svgs/FbSmollOrangeIcon';
import { useGetLatestPostsApiQuery } from '@/store/posts/latestPosts';
import { CommentIcon } from '@/public/assets/svgs/CommentIcon';
import { DateIcon } from '@/public/assets/svgs/DateIcon';
import { Container } from '@/components/ui/container';
import { IPostData } from '@/model/dynamicPage';
import { RelatedPosts } from './RelatedPosts';
import { LatestPosts } from './LatestPosts';
import { formatDate } from '@/helper/time';
import React, { Fragment, useState } from 'react';
import { Responses } from './Responses';
import { Comment } from './Comment';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import classes from './index.module.css';
import classNames from 'classnames';
import { Skeleton } from '@mui/material';

interface Iprops {
    data: IPostData;
};

interface ISkeletonImage {
    src: string;
    alt: string;
}

const SkeletonImage: React.FC<ISkeletonImage> = (props) => {
    const [ isLoad, setIsLoad ] = useState(false);

    const onLoad = () => {
        setIsLoad(true);
    };

    return (
        <div className={classes.skeletonImage}>
            <Image
                {...props}
                onLoad={onLoad}
                className={classNames(classes.postImage, {
                    [classes.loadedImage]: isLoad
                })}
                width={780}
                height={520}
            />
            { !isLoad && (
                <Skeleton
                    sx={{ bgcolor: 'rgba(0, 83, 121, 0.5)', borderRadius: '20px' }}
                    variant="rectangular"
                    height={520}
                />
            )}
        </div>
    );
};

const Post: React.FC<Iprops> = ({ data }) => {
    const latestPostCategory = data.categoryName === 'News' ? 'blogs' : 'news';
    const latestPostCategoryId = latestPostCategory === 'blogs' ? 1 : 2;
    const { data: dataLatestPosts } = useGetLatestPostsApiQuery(`getLast2Data?category=${latestPostCategoryId}&limit=2`);

    if(!data) return null;

    return (
        <Fragment>
            <Head>
                <title key={1}>
                    {data.categoryName} | Wichita Car Transport CRM {data.categoryName.slice(0, data.categoryName.length - 1)}
                </title>,
                <meta key={2}
                    property="og:title"
                    data-hid="og:title"
                    data-n-head="ssr"
                    content={`Wichita Car Transport Website ${data.categoryName}`}
                />
            </Head>
            <section className={classes.mt160}>
                <Container>
                    <div className={classes.postSection}>
                        <div className={classes.postContent}>
                            <h1 className={classes.title}>
                                <Link href={data.categoryName || ''}>
                                    {data.categoryName}
                                </Link>
                            </h1>
                            <div className={classes.wrapperImage}>
                                { data.image &&
                                    <SkeletonImage
                                        alt={`hero ${data.categoryName} image`}
                                        src={data.image}
                                    />
                                }
                                <div className={classes.wrapperSocial}>
                                    <div className={classes.calendarSlice}>
                                        <DateIcon />
                                        <span className={classes.defaultText}>{formatDate(data.date)}</span>
                                        <div className={classes.verticalRow}/>
                                        <span className={classes.calendarSlicePostText}>
                                            <Link href={data.categoryName || ''}>
                                                {data.categoryName}
                                            </Link>
                                        </span>
                                        <div className={classes.comment}>
                                            <CommentIcon />
                                            <span>{data.post_comment.length}</span>
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
                                    </div>
                                </div>
                            </div>
                            <div className={classes.postBody}>
                                <p dangerouslySetInnerHTML={{ __html: data.content }}/>
                            </div>
                        </div>
                        { dataLatestPosts && <LatestPosts
                            latestPosts={dataLatestPosts}
                            latestPostCategory={latestPostCategory}
                        />}
                    </div>
                </Container>
            </section>
            {Boolean(data.post_comment && data.post_comment.length) && (
                <section>
                    <Container>
                        <Responses comment={data.post_comment} />
                    </Container>
                </section>
            )}
            <section>
                <Container>
                    <div className={classes.relatedPosts}>
                        { Boolean(data.relatedPosts.length) && (
                            <RelatedPosts relatedPosts={data.relatedPosts} />
                        )}
                        <Comment postId={data?.id}/>
                    </div>
                </Container>
            </section>
        </Fragment>
    );
};

export { Post };