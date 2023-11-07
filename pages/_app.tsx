import type { AppProps } from 'next/app';
import Layout from '@/components/layout';
import Head from 'next/head';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};
