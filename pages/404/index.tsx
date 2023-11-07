import { NextPage } from 'next';
import { Fragment } from 'react';
import { metaTags } from '@/constants/metaTags';
import Link from 'next/link';
import Head from 'next/head';
import classes from './index.module.css';
import Image from 'next/image';

const NotFounda: NextPage = () => {
  return (
    <Fragment>
      <Head>{metaTags.notFound}</Head>
      <div className={classes.container}>
        <Image
          alt='404 background image'
          src='/assets/images/404-bg.png'
          width={1920}
          height={1080}
          className={classes.bgImage}
        />
        <div className={classes.notFoundWrapperLogo}>
          <Image
            src='/assets/images/404.png'
            alt='404 image'
            width={404}
            height={150}
            className={classes.image}
          />
          <h1 className={classes.title}>
            Page <span>Not</span> Found
          </h1>
        </div>

        <p className={classes.text}>
          The page you’re looking for 
          could not be found.
        </p>

        <Link
          href='/'
          className={classes.link}
        >
          Go to Homepage
        </Link>
      </div>
    </Fragment>
  );
};

export default NotFounda;