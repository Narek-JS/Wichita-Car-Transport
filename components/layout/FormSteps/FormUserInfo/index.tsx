import { useFormik } from 'formik';
import { LabelUI } from '@/components/ui/LabelUI';
import { GoBackFormIcon } from '@/public/assets/svgs/GoBackFormIcon';
import { IUserInfoFormData, SetStepFunction, UpdateGeneralFormData } from '@/model/form';
import { validationSchemaFormUserInfo } from '@/constants/validationSchema';
import { FormikErrors } from '@/components/ui/FormikError';
import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';
import classNames from 'classnames';


interface IProps {
    setStep: SetStepFunction;
    updateGeneralFormData: UpdateGeneralFormData;
    initialValues: IUserInfoFormData;
    animatedBorder: '' | 'back' | 'continue';
};

const FormUserInfo: React.FC<IProps> = ({
    initialValues,
    updateGeneralFormData,
    setStep,
    animatedBorder
}) => {
    const { width } = useWindowSize();

    const formik = useFormik<IUserInfoFormData>({
        initialValues,
        onSubmit: (values) => {
            updateGeneralFormData('form_user_info', values);
        },
        validationSchema: validationSchemaFormUserInfo
    });

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
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
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name='name'
                        />
                        <FormikErrors {...{ classes, formik, name: 'name' }} />
                    </div>
                    <div className={classes.inputWrapper}>
                        <LabelUI text='Phone number' toolti={true} icon={true}/>
                        <input
                            className={classes.input}
                            autoComplete='off'
                            placeholder='( 999 ) 999 - 999'
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            name='phone'
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
                            onChange={formik.handleChange}
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
            > Continue </button>
        </form> 
    );
};

export { FormUserInfo };