import { metaTags } from '@/constants/metaTags';
import { NextPage } from 'next';
import { Fragment } from 'react';
import { useGetFaqsQuery } from '@/store/faq';
import { Questions } from '@/components/faqs/Questions';
import { Container } from '@/components/ui/container';
import { useScrollToView } from '@/hooks/useScrollToView';
import Head from 'next/head';
import Image from 'next/image';
import classes from './index.module.css';

const Faqs: NextPage = () => {
  const { data } = useGetFaqsQuery('getDynamicData/faq');
  const sectionRef = useScrollToView<HTMLDivElement>();

  return (
    <Fragment>
      <Head>{metaTags.faqs}</Head>
      <section className={classes.questionsSection} ref={sectionRef}>
        <Container>
          <Questions
            title={data?.title || ''}
            subTitle={data?.subTitle || ''}
            questions={data?.questions.map(question => ({...question, active: false})) || []}
          />
        </Container>
      </section>
    </Fragment>
  );
};

export default Faqs;