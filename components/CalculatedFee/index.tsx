import { Container } from '../ui/container';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { AddIcon } from '@/public/assets/svgs/AddIcon';
import { useState } from 'react';
import { CloseIcon } from '@/public/assets/svgs/CloseIcon';
import Link from 'next/link';
import classes from './index.module.css';
import Image from 'next/image';
import classNames from 'classnames';

const CalculatedFee: React.FC = () => {

    const calculatedSteps = [
        {
            imagePath: '/assets/images/calculatedStepImage1.png',
            text: 'The size and weight of your vehicle'
        },
        {
            imagePath: '/assets/images/calculatedStepImage2.png',
            text: 'Distance between vehicle pickup and delivery '
        },
        {
            imagePath: '/assets/images/calculatedStepImage3.png',
            text: 'Choosing open or enclosed car transport'
        },
        {
            imagePath: '/assets/images/calculatedStepImage4.png',
            text: 'The condition of your vehicle'
        },
    ];

    const calculatedQuestions = [
        {
            question: 'Lorem ipsum dolor sit amet consectetur ?',
            answer: 'Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. '
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur ?',
            answer: 'Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. '
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur ?',
            answer: 'Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. '
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur ?',
            answer: 'Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. Faucibus et cras metus quam. Eu accumsan vel suspendisse vel nisl eu lacus pellentesque imperdiet.Lorem ipsum dolor sit amet consectetur. '
        }
    ];

    const [modifyQuestions, setModifyQuestions] = useState(calculatedQuestions.map(_ => ({ ..._, active: false })));

    const selectQuestionNode = (index) => {
        setModifyQuestions(modifyQuestions.map((_, i) => ({
            ..._,
            active: index === i && !_.active
        })));
    };

    return (
        <section className={classes.calculatedFee}>
            <Container>
                <div className={classes.content}>
                    <div className={classes.node}>
                        <div className={classes.questionsBlock}>
                            { modifyQuestions.map((question, index) => (
                                <div key={index} className={classNames(classes.questionNode, {
                                    activeNode: [question.active] 
                                })}>
                                    <p onClick={() => selectQuestionNode(index)}>
                                        {question.question}
                                        <span className={classes.addIcon}>
                                            {question.active ? <CloseIcon /> : <AddIcon />}
                                        </span>
                                    </p>
                                    <p className={classNames(classes.answer, {
                                        [classes.activeAnswer]: question.active,
                                        [classes.inActiveAnswer]: !question.active
                                    })}>
                                        { question.answer }
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Link href='/asd' className={classes.moreQuestionLink}> <ArrowRightRed /> Read More</Link>
                    </div>
                    <div className={classes.node}>
                        <h2 className={classes.title}>
                            <Image
                                src={'/assets/images/calculatedTitleIcon.png'}
                                alt="title icon"
                                className={classes.calculatedTitleIcon}
                                width={32}
                                height={32}
                            />
                            How are <span>Calculated</span> your transport <span>Fee</span>
                        </h2>
                        <div className={classes.calculatedBlocks}>
                            { calculatedSteps.map((block, index) => (
                                <div key={index} className={classes.box}>
                                    <Image
                                        src={block.imagePath}
                                        alt="Calculated Step image"
                                        className={classes.calculatedTitleIcon}
                                        width={32}
                                        height={32}
                                    />
                                    <p>{block.text}</p>
                                </div>
                            ))}
                            <div className={classes.addCalculated}>
                               <Image
                                    src='/assets/images/calculetedCenterICon.png'
                                    alt='calculeted Center Icon'
                                    className={classes.addCalculatedIcon}
                                    width={48}
                                    height={48}
                               />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { CalculatedFee };