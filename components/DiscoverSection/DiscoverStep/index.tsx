import { ArrowNextDescoverIcon } from '@/public/assets/svgs/ArrowNextDescoverIcon';
import Image from 'next/image';
import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
    step: number;
    imagePath: string;
    title: string;
    description: string;
    isArrow: boolean;
};

const DiscoverStep: React.FC<IProps> = ({
    step,
    imagePath, 
    title, 
    description, 
    isArrow
}) => {

    return (
        <div className={classNames({
            [classes.discoverStepFlex]: isArrow
        })}>
            <div className={classes.box}>
                <div className={classes.forScrool}>
                    <div className={classes.stepNumber}>{String(step)}</div>
                    <Image
                        src={imagePath}
                        alt="step Image"
                        className={classes.image}
                        width={196}
                        height={100}
                    />
                    <h3 className={classes.stepTitle}>{title}</h3>
                    <p className={classes.description}>{description}</p>
                </div>
            </div>
            {isArrow && (
                <div className={classes.arrow}>
                    <ArrowNextDescoverIcon />
                </div>
            )}
        </div>
    );
};

export { DiscoverStep };