import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import Image from 'next/image';
import Link from 'next/link';
import classes from './index.module.css';

interface IProps {
    title: string;
    description: string;
    imagePath: string;
    link: { text: string; url: string };
};

const CarService: React.FC<IProps> = ({
    imagePath,
    title,
    description,
    link: { text, url }
}) => {

    return (
        <div className={classes.carService}>
            <Image
                src={imagePath}
                alt='Image About Company'
                className={classes.image}
                width={390}
                height={240}
            />
            <div className={classes.content}>
                <h3 className={classes.title}>
                    { title }
                </h3>
                <p className={classes.description}>
                    { description }
                </p>
                <Link href={url} className={classes.link}>
                    <ArrowIcon color={'#FDFDFF'} />
                    <span> {text} </span>
                </Link>
            </div>
        </div>
    );
};

export { CarService };