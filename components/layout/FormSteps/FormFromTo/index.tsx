import { IFromToFormData, MentionVariants, SetStepFunction, UpdateGeneralFormData } from '@/model/form';
import { getMentionAnimationValues, getMentionInitialValues } from '@/helper/form';
import { validationSchemaFormFromTo } from '@/constants/validationSchema';
import { useGetOptionsApiQuery } from '@/store/optionsByZip';
import { FormikErrors } from '@/components/ui/FormikError';
import { hendleTypeRemoveSpace } from '@/helper/strings';
import { Autocomplete, TextField } from '@mui/material';
import { LabelUI } from '@/components/ui/LabelUI';
import { eventEmitter } from '@/eventEmitter';
import { motion } from "framer-motion"
import { useFormik } from 'formik';
import { useState } from 'react';
import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
    setStep: SetStepFunction;
    updateGeneralFormData: UpdateGeneralFormData;
    initialValues: IFromToFormData;
    animatedBorder: '' | 'back' | 'continue';
};

const FormFromTo: React.FC<IProps> = ({
    setStep,
    updateGeneralFormData,
    initialValues,
    animatedBorder
}) => {
    const [ animationVariant, setAnimationVariant ] = useState<MentionVariants>('fromLeft');
    const formik = useFormik<IFromToFormData>({
        initialValues,
        onSubmit: (values) => {
            updateGeneralFormData('from_to', values);
            setAnimationVariant('toRight');
        },
        validationSchema: validationSchemaFormFromTo
    });

    eventEmitter.subscribe('resetForm', () => {
        formik.resetForm();
    });

    const { isLoading: isLoadingFrom, data: fromData } = useGetOptionsApiQuery(formik.values.from, {
        skip: !formik.values.from
    });

    const { isLoading: isLoadingTo, data: toData } = useGetOptionsApiQuery(formik.values.to, {
        skip: !formik.values.to
    });

    const onAnimationComplete = () => {
        if(animationVariant === 'toRight') {
            setStep(2);
        }
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
            onSubmit={formik.handleSubmit}
        >
            <h2 className={classes.fromTitle}>
                GET A <span>FREE</span> QUOTE <span>NOW</span>
            </h2>

            <div className={classes.inputWrapper}>
                <LabelUI text='From' toolti={true} icon={true}/>
                <Autocomplete
                    className='autocomplete'
                    options={formik.values.from === '' ? [] : (fromData?.data || [])}
                    clearOnBlur={false}
                    loading={isLoadingFrom}
                    value={formik.values.from}
                    renderInput={(params) => <TextField
                        onSelect={(event) => {
                            const { value } = event.target as any;
                            formik.setValues({
                                from: value,
                                to: formik.values.to
                            });
                        }}
                        {...params}
                        onInput={(event) => hendleTypeRemoveSpace(event)}
                        placeholder="City,State or ZIP"
                    />}
                />
                <FormikErrors {...{ classes, formik, name: 'from' }}/>
            </div>
            <div className={classes.inputWrapper}>
                <LabelUI text='To' toolti={true} icon={true}/>
                <Autocomplete
                    className='autocomplete'
                    options={formik.values.to === '' ? [] : (toData?.data || [])}
                    clearOnBlur={false}
                    loading={isLoadingTo}
                    value={formik.values.to}
                    renderInput={(params) => <TextField
                        onSelect={(event) => {
                            const { value } = event.target as any;
                            formik.setValues({
                                to: value,
                                from: formik.values.from
                            });
                        }}
                        {...params}
                        onInput={(event) => hendleTypeRemoveSpace(event)}
                        placeholder="City,State or ZIP"
                    />}
                />
                <FormikErrors {...{ classes, formik, name: 'to' }}/>
            </div>
            <button
                type='submit'
                className={classNames(classes.btn, {
                    [classes.btnAnimeBorder]: animatedBorder === 'continue'
                })}
            >
                Continue
            </button>
        </motion.form>
    );
};

export { FormFromTo };