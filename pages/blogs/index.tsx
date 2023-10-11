import { PostWrapper } from '@/components/postWrapper';
import { metaTags } from '@/constants/metaTags';
import { Fragment } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

const Blogs: NextPage = () => {

    return (
        <Fragment>
          <Head>{metaTags.blogs}</Head>
          <PostWrapper />
        </Fragment>
    );
};

export default Blogs;