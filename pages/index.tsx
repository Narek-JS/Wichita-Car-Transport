import { AboutCompany, Articles, CarMovingServices } from '@/components/Home';
import { ReviewSection } from '@/components/ReviewSection';
import { CalculatedFee } from '@/components/CalculatedFee';
import { HelpSection } from '@/components/HelpSection';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { Redirect } from '@/components/Redirect';
import { metaTags } from '@/constants/metaTags';
import { useGetHomeQuery } from '@/store/home';
import { Fragment } from 'react';
import Head from 'next/head';

export default function Home() {
  const { isError, isLoading } = useGetHomeQuery('home');

  if(isError) return <Redirect to='/404' />;

  return (
    <Fragment>
      { isLoading && <LoadingUI type='fullPage' /> }
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
