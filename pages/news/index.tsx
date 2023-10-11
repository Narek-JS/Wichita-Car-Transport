import { PostWrapper } from '@/components/postWrapper';
import { Fragment } from 'react';
import { metaTags } from '@/constants/metaTags';
import { NextPage } from 'next';
import Head from 'next/head';

const News: NextPage = () => {
    return (
        <Fragment>
          <Head>{metaTags.news}</Head>
          <PostWrapper />
        </Fragment>
    );
};

export default News;