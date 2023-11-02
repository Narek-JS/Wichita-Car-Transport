import classes from './index.module.css';

interface IProps {
  type: "round" | 'row' | 'fullPage' | 'roundSmall',
};

const LoadingUI: React.FC<IProps> = ({ type }) => {

  if(type === 'fullPage') {
    return <div className={classes[type]}>
      <span className={classes.loader} />
      <span className={classes.loader2} />
    </div>
  }

  return (
    <span className={classes[type]} />
  );
}

export { LoadingUI };