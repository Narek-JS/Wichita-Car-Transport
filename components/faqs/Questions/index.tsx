import { Container } from '@/components/ui/container';
import { Fragment, useState } from 'react';
import { sliceDangerousHTMLString } from '@/helper/strings';
import { IQuestions } from '@/model/faqs';
import { AddIcon } from '@/public/assets/svgs/AddIcon';
import classNames from 'classnames';
import classes from './index.module.css';

interface IFaqQuestions extends IQuestions {
    active: boolean;
};

interface IProps {
    title: string;
    subTitle: string;
    questions: Array<IFaqQuestions>
};

const Questions: React.FC<IProps> = ({ questions, title, subTitle}) => {

    const [ faqsQuestions, setFaqsQuestions ] = useState<Array<IFaqQuestions>>(questions);

    const toogleQuestion = (index) => {
        setFaqsQuestions((faqsQuestions.length ? faqsQuestions : questions).map((question, i) => ({
            ...question,
            active: index === i && question.active === false
        })));
    };

    return (
        <Fragment>
            <h1 className={classes.title}>{title}</h1>
            <h5 className={classes.subTitle}>{subTitle}</h5>
            <div className={classes.wrapperQuestions}>
                { (faqsQuestions.length ? faqsQuestions : questions).map(({ answer, question, active }, index) => (
                    <div className={classes.questionList} key={index}>
                        <div
                            className={classNames(classes.question, {
                                [classes.activeQuestion]: active
                            })}
                            onClick={() => toogleQuestion(index)}
                        >
                            <p>{question}</p>
                            <i className={classNames(classes.icon, { [classes.actioveIcon]: active })}>
                                <AddIcon {...(active && { type: 'minuse' })}/>
                            </i>
                        </div>
                        <div
                            className={classNames(classes.answer, {
                                [classes.active]: active,
                                [classes.inActive]: !active
                            })}
                            dangerouslySetInnerHTML={sliceDangerousHTMLString({__html: answer})}
                        />
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export { Questions };