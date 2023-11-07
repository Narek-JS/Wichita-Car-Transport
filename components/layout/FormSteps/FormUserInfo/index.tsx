import { getCuurentFormatData, getMentionAnimationValues, getMentionInitialValues } from '@/helper/form';
import { IFormData, IUserInfoFormData, MentionVariants, SetStepFunction } from '@/model/form';
import { validationSchemaFormUserInfo } from '@/constants/validationSchema';
import { GoBackFormIcon } from '@/public/assets/svgs/GoBackFormIcon';
import { useQuoteFormMutation } from '@/store/quoteForm/mutation';
import { FormikErrors } from '@/components/ui/FormikError';
import { hendleTypeRemoveSpace } from '@/helper/strings';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { LabelUI } from '@/components/ui/LabelUI';
import { openThankYou } from '@/store/thankYou';
import { useAppDispatch } from '@/store/hooks';
import { eventEmitter } from '@/eventEmitter';
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { useFormik } from 'formik';
import { useState } from 'react';

import classNames from 'classnames';
import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';

interface IProps {
    setStep: SetStepFunction;
    initialValues: IUserInfoFormData;
    animatedBorder: '' | 'back' | 'continue';
    formData: IFormData;
    handleResetForm: () => void;
};

const FormUserInfo: React.FC<IProps> = ({
    initialValues,
    setStep,
    animatedBorder,
    formData,
    handleResetForm
}) => {
    const dispatch = useAppDispatch();
    const [ mutate, { isLoading } ] = useQuoteFormMutation();
    const [ animationVariant, setAnimationVariant ] = useState<MentionVariants>('fromLeft');
    const { width } = useWindowSize();

    const formik = useFormik<IUserInfoFormData>({
        initialValues,
        onSubmit: (values) => {
            if(!isLoading) {
                const modifyeFormData = getCuurentFormatData({
                    ...formData,
                    form_user_info: values
                });
                mutate(modifyeFormData).then(() => {
                    toast.success('your message is successfully sent', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    dispatch(openThankYou());
                }).catch(() => {
                    toast.error('something is wrong', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }).finally(() => {
                    handleResetForm();
                    setAnimationVariant('toRight');
                });
            };
        },
        validationSchema: validationSchemaFormUserInfo
    });

    eventEmitter.subscribe('resetForm', formik.resetForm);

    const onAnimationComplete = () => {
        if(animationVariant === 'toRight') {
            setStep(1);
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
            onSubmit={formik.handleSubmit}
        >
            <div
                className={classNames(classes.goBack, {
                    [classes.backAnime]: animatedBorder === 'back'
                })}
                onClick={() => setStep(3)}
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
                <div className={classes.firstNode}>
                    <div className={classes.inputWrapper}>
                        <LabelUI text='Name' toolti={true} icon={true}/>
                        <input
                            className={classes.input}
                            autoComplete='off'
                            placeholder='Enter full name'
                            onChange={(event) => {
                                hendleTypeRemoveSpace(event);
                                formik.handleChange(event);
                            }}
                            value={formik.values.name}
                            name='name'
                        />
                        <FormikErrors {...{ classes, formik, name: 'name' }} />
                    </div>
                    <div className={classes.inputWrapper}>
                        <LabelUI text='Phone number' toolti={true} icon={true}/>
                        <IMaskInput
                            className={classes.input}
                            value={formik.values.phone}
                            placeholder='Enter Phone number'
                            type="tel"
                            mask="(#00) 000-0000"
                            definitions={{"#": /[1-9]/}}
                            name='phone'
                            onChange={formik.handleChange}
                        />
                        <FormikErrors {...{ classes, formik, name: 'phone' }} />
                    </div>
                </div>
                <div className={classes.seccondNode}>
                    <div className={classes.inputWrapper}>
                        <LabelUI text='Email' toolti={true} icon={true}/>
                        <input
                            className={classes.input}
                            autoComplete='off'
                            placeholder='example@domain.com'
                            onChange={(event) => {
                                hendleTypeRemoveSpace(event);
                                formik.handleChange(event);
                            }}
                            value={formik.values.email}
                            name='email'
                        />
                        <FormikErrors {...{ classes, formik, name: 'email' }} />
                    </div>
                </div>
            </div>
            
            <button
                className={classNames(classes.btn, {
                    [classes.btnAnimeBorder]: animatedBorder === 'continue'
                })}
                type='submit'
            >
                {isLoading && <LoadingUI type='roundSmall' />}
                {!isLoading && 'Continue' }
            </button>
        </motion.form>
    );
};

export { FormUserInfo };