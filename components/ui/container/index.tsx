import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
    children: React.ReactNode;
    parentCssObject?: {
        readonly [key: string]: string;
    };
};

const Container: React.FC<IProps> = ({ children, parentCssObject }) => {
    return (
        <div className={classNames(classes.container, {
            ...(parentCssObject && { [parentCssObject.container]: true })
        })}>
            {children}
        </div>
    );
};

export { Container };