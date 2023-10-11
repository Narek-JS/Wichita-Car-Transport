import { useFormik } from 'formik';
import { LabelUI } from '@/components/ui/LabelUI';
import { AddVehiclesIcon } from '@/public/assets/svgs/AddVehiclesIcon';
import { RemoveVehiclesIcon } from '@/public/assets/svgs/RemoveVehiclesIcon';
import { DropdownSelectUI } from '@/components/ui/DropdownSelectUI';
import { timeOptions } from '@/constants/options';
import { GoBackFormIcon } from '@/public/assets/svgs/GoBackFormIcon';
import {
    IVehicleFormData,
    SetStepFunction,
    TypeOperableMethod,
    TypeShippingMethod,
    UpdateGeneralFormData,
    VahicleNode
} from '@/model/form';
import { validationSchemaFormVehicles } from '@/constants/validationSchema';
import { FormikErrors } from '@/components/ui/FormikError';
import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';
import classNames from 'classnames';

interface IProps {
    setStep: SetStepFunction;
    updateGeneralFormData: UpdateGeneralFormData;
    initialValues: IVehicleFormData;
    animatedBorder: '' | 'back' | 'continue';
};

const FormVehicles: React.FC<IProps> = ({ setStep, updateGeneralFormData, initialValues, animatedBorder }) => {
    const { width } = useWindowSize();

    const formik = useFormik<IVehicleFormData>({
        initialValues,
        onSubmit: (values) => {
            updateGeneralFormData('form_vehicles', values);
            setStep(3);
        },
        validationSchema: validationSchemaFormVehicles
    });

    const handleSelectTime = (value: string) => {
        formik.setFieldValue("time", value);
    };

    const handleCheckboxChange = (field: 'shippingMethod' | 'isOperable', value: TypeShippingMethod | TypeOperableMethod) => {
        formik.setFieldValue(field, value);
    };

    const addVehicleList = () => {
        formik.setValues(prev => {
            prev.vehicle.push(new VahicleNode());
            return {...prev};
        });
    };

    const removeVehicleList = () => {
        if(formik.values.vehicle.length === 1) return;

        formik.setValues(prev => {
            prev.vehicle.pop();
            return { ...prev };
        });
    };

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div
                className={classNames(classes.goBack, {
                    [classes.backAnime]: animatedBorder === 'back'
                })}
                onClick={() => setStep(1)}
            >
                <GoBackFormIcon
                    {...(Number(width) <= 768 && { width: 18, height: 18 })}
                />
                <span>Edit</span>
            </div>
            <h2 className={classes.fromTitle}>
                Get A <span>FREE</span> Quote
            </h2>
            <div className={classes.vehicles}>
                <LabelUI text='Vehicle' toolti={true} icon={true}/>
                { formik.values.vehicle.map((vehicle, index) => {
                    const errors = formik.errors as any;
                    return (
                        <div key={index} className={classes.vehicleList}>
                            <div className={classes.inputWrapper}>
                                <input
                                    className={classes.input}
                                    autoComplete='off'
                                    placeholder='Year'
                                    onChange={formik.handleChange}
                                    name={`vehicle[${index}].year`}
                                    value={vehicle.year}
                                />
                                { formik.touched?.vehicle?.[index]?.year && errors?.vehicle?.[index]?.year && <span className={classes.error}>{errors.vehicle?.[index]?.year}</span>}
                            </div>
                            <div className={classes.inputWrapper}>
                                <input
                                    className={classes.input}
                                    autoComplete='off'
                                    placeholder='Make'
                                    onChange={formik.handleChange}
                                    name={`vehicle[${index}].make`}
                                    value={vehicle.make}
                                />
                                { formik.touched?.vehicle?.[index]?.make && errors?.vehicle?.[index]?.make && <span className={classes.error}>{errors.vehicle?.[index]?.make}</span>}
                            </div>
                            <div className={classes.inputWrapper}>
                                <input
                                    className={classes.input}
                                    autoComplete='off'
                                    placeholder='Model'
                                    onChange={formik.handleChange}
                                    name={`vehicle[${index}].model`}
                                    value={vehicle.model}
                                />
                                { formik.touched?.vehicle?.[index]?.model && errors?.vehicle?.[index]?.model && <span className={classes.error}>{errors.vehicle?.[index]?.model}</span>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={classes.underVehicleLine}>
                <div className={classes.addIcon} onClick={addVehicleList}>
                    <AddVehiclesIcon />
                    <span>Add Multiple Vehicle</span>
                </div>
                <div className={classes.removeIcon} onClick={removeVehicleList}>
                    <RemoveVehiclesIcon />
                    <span>Remove Vehicle</span>
                </div>
            </div>
            <div className={classes.seccondLine}>
                <div className={classes.dropDownWrapper}>
                    <LabelUI text='Time' toolti={true} icon={true}/>
                    <DropdownSelectUI
                        items={timeOptions}
                        selectedItem={formik.values.time}
                        setSelectedItem={handleSelectTime}
                    />
                    <FormikErrors {...{ classes, formik, name: 'time' }}/>
                </div>
                <div className={classes.nestedNode}>
                    <div className={classes.shippingMethod}>
                        <LabelUI text='Shipping Method?' toolti={true} icon={true}/>
                        <div className={classes.wrapperCheckboxes}>
                            <div
                                className={classes.checkBox}
                                onClick={() => handleCheckboxChange('shippingMethod', 'open')}
                            >
                                <input
                                    type='checkbox'
                                    className={classes.checkboxInput}
                                    checked={formik.values.shippingMethod === 'open'}
                                    name='shippingMethod'
                                />
                                <label>Open</label>
                            </div>
                            <div
                                className={classes.checkBox}
                                onClick={() => handleCheckboxChange('shippingMethod', 'enclosed')}
                            >
                                <input
                                    type='checkbox'
                                    className={classes.checkboxInput}
                                    checked={formik.values.shippingMethod === 'enclosed'}
                                    name='shippingMethod'
                                />
                                <label>Enclosed</label>
                            </div>
                            <FormikErrors {...{ classes, formik, name: 'shippingMethod' }} />
                            { formik.errors?.shippingMethod && <span className={classes.error}>{formik.errors?.shippingMethod}</span>}
                        </div>
                    </div>
                    <div className={classes.operableOrNot}>
                        <LabelUI text='Is It Operable?' toolti={true} icon={true}/>
                        <div className={classes.wrapperCheckboxes}>
                            <div
                                className={classes.checkBox}
                                onClick={() => handleCheckboxChange('isOperable', 'yes')}
                            >
                                <input
                                    type='checkbox'
                                    className={classes.checkboxInput}
                                    checked={formik.values.isOperable === 'yes'}
                                    name='isOperable'
                                />
                                <label>Yes</label>
                            </div>
                            <div
                                className={classes.checkBox}
                                onClick={() => handleCheckboxChange('isOperable', 'no')}
                            >
                                <input
                                    type='checkbox'
                                    className={classes.checkboxInput}
                                    checked={formik.values.isOperable === 'no'}
                                    name='isOperable'
                                />
                                <label>No</label>
                            </div>
                            <FormikErrors {...{ classes, formik, name: 'isOperable' }} />
                        </div>
                    </div>
                </div>
            </div>
            <button
                className={classNames(classes.btn, {
                    [classes.btnAnimeBorder]: animatedBorder === 'continue'
                })}
                type='submit'
            >
                Continue
            </button>
        </form>
    );
};

export { FormVehicles };