import { metaTags } from '@/constants/metaTags';
import { Fragment } from 'react';
import { NextPage } from 'next';

import Link from 'next/link';
import Head from 'next/head';
import classes from './index.module.css';

const NotFound: NextPage = () => {

  return (
    <Fragment>
      <Head>{metaTags.notFound}</Head>
      <div className={classes.container}>
        <h1 className={classes.title}>404 - Page Not Found</h1>
        <p className={classes.message}>The page you&apos;re looking for could not be found.</p>
        <p className={classes.back}>
          Go back to 
          <Link href="/">
            <span className={classes.link}>the homepage</span>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default NotFound;