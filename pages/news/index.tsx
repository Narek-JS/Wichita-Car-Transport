import { Posts } from '@/components/Posts';
import { Fragment } from 'react';
import { metaTags } from '@/constants/metaTags';
import { NextPage } from 'next';
import Head from 'next/head';

const News: NextPage = () => {
    return (
        <Fragment>
          <Head>{metaTags.news}</Head>
          <Posts />
        </Fragment>
    );
};

export default News;