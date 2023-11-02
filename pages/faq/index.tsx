import { sliceDangerousHTMLString } from '@/helper/strings';
import { useScrollToView } from '@/hooks/useScrollToView';
import { AddIcon } from '@/public/assets/svgs/AddIcon';
import { Container } from '@/components/ui/container';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { metaTags } from '@/constants/metaTags';
import { useGetFaqsQuery } from '@/store/faq';
import { Fragment, useState } from 'react';
import { NextPage } from 'next';

import Head from 'next/head';
import classNames from 'classnames';
import classes from './index.module.css';

const Faqs: NextPage = () => {
  const { data, isLoading } = useGetFaqsQuery('getDynamicData/faq');
  const [ activeIndex, setActiveIndex ] = useState<null | number>();
  const sectionRef = useScrollToView<HTMLDivElement>();

  const toogleActiveIndex = (index: number) => {
    if(activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    };
  };

  return (
    <Fragment>
      { isLoading && <LoadingUI type='fullPage' /> }
      <Head>{metaTags.faqs}</Head>
      <section className={classes.questionsSection} ref={sectionRef}>
        <Container>
          <h1 className={classes.title}>{data?.title || ''}</h1>
          <h5 className={classes.subTitle}>{data?.subTitle || ''}</h5>
          <div className={classes.wrapperQuestions}>
            { data?.questions.map(({ answer, question }, index) => (
              <div className={classes.questionList} key={index}>
                <div
                  className={classNames(classes.question, {
                    [classes.activeQuestion]: activeIndex === index
                  })}
                  onClick={() => toogleActiveIndex(index)}
                >
                  <p>{question}</p>
                  <i className={classNames(classes.icon, {
                    [classes.actioveIcon]: activeIndex === index 
                  })}>
                    <AddIcon {...(activeIndex === index && { type: 'minuse' })}/>
                  </i>
                </div>
                <div
                  className={classNames(classes.answer, {
                    [classes.active]: activeIndex === index ,
                    [classes.inActive]: activeIndex !== index 
                  })}
                  dangerouslySetInnerHTML={sliceDangerousHTMLString({__html: answer})}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Faqs;