import { Fragment } from 'react';
import { metaTags } from '@/constants/metaTags';
import { ReviewSection } from '@/components/ReviewSection';
import { AboutCompany, Articles, CarMovingServices } from '@/components/Home';
import { CalculatedFee } from '@/components/CalculatedFee';
import { HelpSection } from '@/components/HelpSection';
import { useGetHomeQuery } from '@/store/home';
import Head from 'next/head';

export default function Home() {
  useGetHomeQuery('home');
  
  return (
    <Fragment>
      <Head>{metaTags.home}</Head>
      <CarMovingServices />
      <ReviewSection />
      <AboutCompany />
      <CalculatedFee />
      <Articles />
      <HelpSection />
    </Fragment>
  );
};
