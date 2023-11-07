import { Exclamation } from '@/public/assets/svgs/Exclamation';
import { TooltipUI } from '../TooltipUI';
import classes from './index.module.css';

interface IProps {
    text: string;
    icon?: boolean;
    toolti?: boolean;
    tooltiPosition?: 'top' | 'right' | 'bottom' | 'left';
    htmlFor?: string;
    color?: string;
};

const LabelUI: React.FC<IProps> = ({
    text,
    icon = false,
    toolti = false,
    tooltiPosition = 'right',
    htmlFor,
    color
}) => {
    const styles = {
        ...(color && { color })
    }
    if(icon && toolti) {
        return (
            <label
                className={classes.label}
                {...(htmlFor && { htmlFor })}
                style={styles}
            >
                {text}
                <TooltipUI color={color} content={text} direction={tooltiPosition} >
                    <Exclamation {...styles}/>
                </TooltipUI>
            </label>
        );
    };

    return (
        <label
            className={classes.label}
            {...(htmlFor && { htmlFor })}
            style={styles}
        >
            {text}
            { icon && <Exclamation /> }
        </label>
    )
}

export { LabelUI };