import { metaTags } from '@/constants/metaTags';
import { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { useGetFaqsQuery } from '@/store/faq';
import { Container } from '@/components/ui/container';
import { useScrollToView } from '@/hooks/useScrollToView';
import { AddIcon } from '@/public/assets/svgs/AddIcon';
import { sliceDangerousHTMLString } from '@/helper/strings';
import Head from 'next/head';
import classes from './index.module.css';
import classNames from 'classnames';

const Faqs: NextPage = () => {
  const { data } = useGetFaqsQuery('getDynamicData/faq');
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