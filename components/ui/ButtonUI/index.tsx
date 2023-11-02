import { LoadingUI } from '../LoadingUI';
import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
    classN: 'animationToTransparent' | 'animationFromTransparent' | 'transparent' | 'full' | 'transparent-blue' | 'border-dashed-trans' | 'border-dashed-trans-active',
    text: string;
    width?: 'max-content' | 'full' | number;
    hendlechange?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'reset' | 'submit';
    isLoading?: boolean;
};

const ButtonUI:React.FC<IProps> = ({
    classN,
    text,
    width,
    hendlechange: onClick,
    type='button',
    isLoading
}) => {

    return (
        <button
            className={classNames(
                classes.buttonUI,
                classes[classN],
                {
                    [classes[width || '']]: typeof width === 'string',
                    [classes.loading]: isLoading
                }
            )}
            style={typeof width === 'number' ? { width: width + 'px', minWidth: width + 'px' } : {}}
            {...(onClick && { onClick })}
            {...(type && { type })}
        >
            {isLoading && <LoadingUI type='roundSmall' />}
            {!isLoading && text}
        </button>  
    );
};

export { ButtonUI };