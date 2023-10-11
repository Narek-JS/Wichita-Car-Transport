import Image from 'next/image';
import classes from './index.module.css';

interface IStep {
    imagePath: string;
    text: string;
};

const CalculatedStep: React.FC<IStep> = ({ imagePath, text }) => {

    return (
        <div className={classes.step}>
            <Image
                src={imagePath}
                alt="Calculated Step image"
                className={classes.image}
                width={60}
                height={60}
            />
            <p className={classes.text}>{text}</p>
        </div>
    );
};

export { CalculatedStep };