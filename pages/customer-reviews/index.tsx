import { Fragment, useState } from 'react';
import { metaTags } from '@/constants/metaTags';
import { ReviewsGraph } from '@/components/CustomerReviews';
import { Feedback } from '@/components/CustomerReviews/Feedbacks';
import { FeedbackForm } from '@/components/CustomerReviews/FeedbackForm';
import { useGetCustomerReviewsQuery } from '@/store/customerReviews';
import { LoadingUI } from '@/components/ui/LoadingUI';
import Head from 'next/head';

export default function CustomerReviews() {
  const [ isOpenForm, setIsOpenForm ] = useState(false);
  const { isLoading, data } = useGetCustomerReviewsQuery('');

  if(isLoading) return <LoadingUI type='fullPage' />

  return (
    <Fragment>
      <Head>{metaTags.quote}</Head>
      <ReviewsGraph setIsOpenForm={setIsOpenForm}/>
      <Feedback feedbacks={data?.feedbacks} />
      { isOpenForm && <FeedbackForm setIsOpenForm={setIsOpenForm}/> }
    </Fragment>
  );
};
