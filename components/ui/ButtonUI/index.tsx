import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
    classN: 'animationToTransparent' | 'animationFromTransparent' | 'transparent' | 'full' | 'transparent-blue' | 'border-dashed-trans' | 'border-dashed-trans-active',
    text: string;
    width?: 'max-content' | 'full' | number;
    hendlechange?: (event: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'reset' | 'submit'
};

const ButtonUI:React.FC<IProps> = ({
    classN,
    text,
    width,
    hendlechange: onClick,
    type='button'
}) => {

    return (
        <button
            className={classNames(
                classes.buttonUI,
                classes[classN],
                {[classes[width || '']]: typeof width === 'string'}
            )}
            style={typeof width === 'number' ? { width: width + 'px' } : {}}
            {...(onClick && { onClick })}
            {...(type && { type })}
        >
            {text}
        </button>  
    );
};

export { ButtonUI };