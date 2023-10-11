import { MouseEvent } from 'react';
import { GoBackFormIcon } from '@/public/assets/svgs/GoBackFormIcon';
import { IFormData, SetStepFunction } from '@/model/form';
import classes from './index.module.css';
import useWindowSize from '@/hooks/useWindowSize';
import classNames from 'classnames';

interface IProps {
    formData: IFormData;
    setStep: SetStepFunction;
    animatedBorder: '' | 'back' | 'continue';
};

const FormConfirmation: React.FC<IProps> = ({ formData, setStep, animatedBorder }) => {
    const { width } = useWindowSize();
    
    return (
        <form className={classes.form}>
            <div
                className={classNames(classes.goBack, {
                    [classes.backAnime]: animatedBorder === 'back'
                })}
                onClick={() => setStep(2)}
            >
                <GoBackFormIcon
                    {...(Number(width) <= 768 && { width: 18, height: 18 })}
                />
                <span>Edit</span>
            </div>

            <h2 className={classes.fromTitle}>
                Get A <span>FREE</span> Quote
            </h2>

            <div className={classes.content}>
                <div className={classes.nestedNode}>
                    <div className={classes.node}>
                        <span className={classes.type}>From</span>
                        <p className={classes.value}>{formData.from_to.from}</p>
                    </div>
                    <div className={classes.node}>
                        <span className={classes.type}>To</span>
                        <p className={classes.value}>{formData.from_to.to}</p>
                    </div>
                    <div className={classes.node}>
                        <span className={classes.type}>Vehicle</span>
                        { formData.form_vehicles.vehicle.map(({ make, model, year }, index) => (
                            <p className={classes.value} key={index}>{make}, {model}, {year}</p>
                        ))}
                    </div>
                </div>
                <div className={classes.nestedNode}>
                    <div className={classes.node}>
                        <span className={classes.type}>Time</span>
                        <p className={classes.value}>{formData.form_vehicles.time}</p>
                    </div>
                    <div className={classes.node}>
                        <span className={classes.type}>Shipping Method?</span>
                        <p className={classes.value}>{formData.form_vehicles.shippingMethod}</p>
                    </div>
                    <div className={classes.node}>
                        <span className={classes.type}>Is It Operable?</span>
                        <p className={classes.value}>{formData.form_vehicles.isOperable}</p>
                    </div>
                </div>
            </div>
            
            <button
                className={classNames(classes.btn, {
                    [classes.btnAnimeBorder]: animatedBorder === 'continue'
                })}
                type='submit'
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    setStep(4);
                }}
            > Continue </button>
        </form> 
    )
};

export { FormConfirmation };