import { getMentionAnimationValues, getMentionInitialValues } from '@/helper/form';
import { IFormData, MentionVariants, SetStepFunction } from '@/model/form';
import { GoBackFormIcon } from '@/public/assets/svgs/GoBackFormIcon';
import { MouseEvent, useState } from 'react';
import { motion } from "framer-motion"
import useWindowSize from '@/hooks/useWindowSize';
import classNames from 'classnames';
import classes from './index.module.css';
import { ArrowDynamic } from '@/public/assets/svgs/ArrowDynamic';

interface IProps {
    formData: IFormData;
    setStep: SetStepFunction;
    animatedBorder: '' | 'back' | 'continue';
};

const FormConfirmation: React.FC<IProps> = ({ formData, setStep, animatedBorder }) => {
    const [ animationVariant, setAnimationVariant ] = useState<MentionVariants>('fromLeft');
    const [ activeVehicleIndex, setActiveVehicleInex ] = useState<number | null>(null);
    const { width } = useWindowSize();

    const onAnimationComplete = () => {
        if(animationVariant === 'toRight') {
            setStep(4);
        };
    };

    const toogleVehicleLine = (index: number) => {
        if(activeVehicleIndex === index) {
            setActiveVehicleInex(null);
        } else {
            setActiveVehicleInex(index);
        };
    };

    return (
        <motion.form
            initial={getMentionInitialValues(animationVariant)}
            variants={{
                toFixed: getMentionAnimationValues(animationVariant),
            }}
            animate={'toFixed'}
            onAnimationComplete={onAnimationComplete}
            className={classes.form}
        >
            <div
                className={classNames(classes.goBack, {
                    [classes.backAnime]: animatedBorder === 'back'
                })}
                onClick={() => {
                    setStep(2)
                }}
            >
                <GoBackFormIcon
                    {...(Number(width) <= 768 && { width: 18, height: 18 })}
                />
                <span>Edit</span>
            </div>

            <h2 className={classes.fromTitle}>
                Get A <span>FREE</span> Quote
            </h2>

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
                    <span className={classes.type}>Time</span>
                    <p className={classes.value}>{formData.form_vehicles.time}</p>
                </div>
                <div className={classes.nestedNodeMethods}>
                    <div className={classes.node}>
                        <span className={classes.type}>Shipping Method?</span>
                        <p className={classes.value}>{formData.form_vehicles.shippingMethod}</p>
                    </div>
                    <div className={classes.node}>
                        <span className={classes.type}>Is It Operable?</span>
                        <p className={classes.value}>{formData.form_vehicles.isOperable}</p>
                    </div>
                </div>
                <div className={classNames(classes.node, classes.vehicles)}>
                    <p className={classes.type}>Vehicles</p>
                    { formData.form_vehicles.vehicle.map(({ make, model, year }, index) => (
                        <div className={classes.value} key={index}>
                            <p> <span>Make</span> {make.length > 14 ? make.slice(0, 14) + '..': make}</p>
                            <p> <span>Model</span> {model.length > 14 ? model.slice(0, 14) + '..': model}</p>
                            <p> <span>Year</span> {year}</p>
                        </div>
                    ))}

                    <div className={classes.vehiclesMobile}>
                        { formData.form_vehicles.vehicle.map(({ make, model, year }, index) => (
                            <div className={classNames(classes.vehicleLine, {
                                [classes.activeVehicleLine]: activeVehicleIndex === index
                            })}>
                                <p className={classes.vehicleLineTopPanel} onClick={() => toogleVehicleLine(index)}>
                                    {index + 1}) Vehicle
                                    <ArrowDynamic rotate={index === activeVehicleIndex ? 180 : 0}/>
                                </p>
                                <div className={classes.value} key={index}>
                                    <p> <span>Make</span> {make.length > 14 ? make.slice(0, 14) + '..': make}</p>
                                    <p> <span>Model</span> {model.length > 14 ? model.slice(0, 14) + '..': model}</p>
                                    <p> <span>Year</span> {year}</p>
                                </div>
                            </div>
                        ))}
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
                    setAnimationVariant('toRight');
                }}
            > Continue </button>
        </motion.form> 
    )
};

export { FormConfirmation };