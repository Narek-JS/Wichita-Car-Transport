import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { CloseIcon } from '@/public/assets/svgs/CloseIcon';
import { AddIcon } from '@/public/assets/svgs/AddIcon';
import { useAppSelector } from '@/store/hooks';
import { Container } from '../ui/container';
import { selectHome } from '@/store/home';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import classes from './index.module.css';

const CalculatedFee: React.FC = () => {
    const data = useAppSelector(selectHome).data?.calculate;
    const [ activeNoteIndex, setActiveNoteIndex ] = useState<number>();
    
    const toogleNote = (index: number) => {
        if(activeNoteIndex === index) {
            setActiveNoteIndex(undefined);
        } else {
            setActiveNoteIndex(index);
        };
    };

    return (
        <section className={classes.calculatedFee}>
            <Container>
                <div className={classes.content}>
                    <div className={classes.node}>
                        <div className={classes.questionsBlock}>
                            { data?.notes.map((question, index) => (
                                <div key={index} className={classNames(classes.questionNode, {
                                    [classes.activeNode]: activeNoteIndex === index
                                })}>
                                    <p onClick={() => toogleNote(index)}>
                                        {question.question}
                                        <span className={classes.addIcon}>
                                            {activeNoteIndex === index ? <CloseIcon /> : <AddIcon />}
                                        </span>
                                    </p>
                                    <p className={classNames(classes.answer, {
                                        [classes.activeAnswer]: activeNoteIndex === index,
                                        [classes.inActiveAnswer]: activeNoteIndex !== index
                                    })}>
                                        { question.answer }
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Link href='/faq' className={classes.moreQuestionLink}> <ArrowRightRed /> Read More</Link>
                    </div>
                    <div className={classes.node}>
                        <h2 className={classes.title}>
                            { data?.titleImage && (
                                <Image
                                    src={data?.titleImage}
                                    alt="title icon"
                                    className={classes.calculatedTitleIcon}
                                    width={32}
                                    height={32}
                                />
                            )}
                            {/* { data?.title } */}
                            How are <span>Calculated</span> your transport <span>Fee</span>
                        </h2>
                        <div className={classes.calculatedBlocks}>
                            { data?.steps.map((block, index) => (
                                <div key={index} className={classes.box}>
                                    <Image
                                        src={block.image}
                                        alt="Calculated Step image"
                                        className={classes.calculatedTitleIcon}
                                        width={32}
                                        height={32}
                                    />
                                    <p>{block.text}</p>
                                </div>
                            ))}
                            { data?.stepImage && (
                                <div className={classes.addCalculated}>
                                    <Image
                                        src={data?.stepImage}
                                        alt='calculeted Center Icon'
                                        className={classes.addCalculatedIcon}
                                        width={48}
                                        height={48}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { CalculatedFee };