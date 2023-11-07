import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
  type: "round" | 'row' | 'fullPage' | 'roundSmall',
  color?: 'yellow'
};

const LoadingUI: React.FC<IProps> = ({ type, color }) => {

  if(type === 'fullPage') {
    return <div className={classes[type]}>
      <span className={classes.loader} />
      <span className={classes.loader2} />
    </div>
  }

  return (
    <span className={classNames(classes[type], {
      [classes.yellow]: color
    })} />
  );
}

export { LoadingUI };