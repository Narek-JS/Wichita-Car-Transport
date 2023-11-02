import { useGetCustomerReviewsQuery } from '@/store/customerReviews';
import { Feedback } from '@/components/CustomerReviews/Feedbacks';
import { ReviewsGraph } from '@/components/CustomerReviews';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { Redirect } from '@/components/Redirect';
import { metaTags } from '@/constants/metaTags';
import { Fragment } from 'react';
import Head from 'next/head';

export default function CustomerReviews() {
  const { isLoading, isError } = useGetCustomerReviewsQuery('reviews');

  if(isError) return <Redirect to='/404' />;

  return (
    <Fragment>
      { isLoading && <LoadingUI type='fullPage' /> }
      <Head>{metaTags.customerReviews}</Head>
      <ReviewsGraph />
      <Feedback />
    </Fragment>
  );
};
