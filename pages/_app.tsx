import type { AppProps } from 'next/app';
import { Ubuntu } from 'next/font/google';
import Layout from '@/components/layout';
import Head from 'next/head';
import '@/styles/globals.css';

const ubuntuFont = Ubuntu({
  weight: '400',
  subsets: ['latin'],
  style: 'normal'
});

Array.prototype.isEmpty = function () {
  return !Boolean(this.length);
};

Number.prototype.isOdd = function (number) {
  return number % 2 !== 0;
};

Number.prototype.isEven = function (number) {
  return number % 2 === 0;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={ubuntuFont.className}>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
};
