import { useFormik } from 'formik';
import { LabelUI } from '@/components/ui/LabelUI';
import { IFromToFormData, SetStepFunction, UpdateGeneralFormData } from '@/model/form';
import { validationSchemaFormFromTo } from '@/constants/validationSchema';
import { FormikErrors } from '@/components/ui/FormikError';

import classes from './index.module.css';
import classNames from 'classnames';

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
    const formik = useFormik<IFromToFormData>({
        initialValues,
        onSubmit: (values) => {
            updateGeneralFormData('from_to', values);
            setStep(2);
        },
        validationSchema: validationSchemaFormFromTo
    });

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <h2 className={classes.fromTitle}>
                Get A <span>FREE</span> Quote
            </h2>

            <div className={classes.inputWrapper}>
                <LabelUI text='From' toolti={true} icon={true}/>
                <input
                    className={classes.input}
                    autoComplete='off'
                    placeholder='City,State or ZIP'
                    onChange={formik.handleChange}
                    value={formik.values.from}
                    name='from'
                />
                <FormikErrors {...{ classes, formik, name: 'from' }}/>
            </div>
            <div className={classes.inputWrapper}>
                <LabelUI text='To' toolti={true} icon={true}/>
                <input
                    className={classes.input}
                    autoComplete='off'
                    placeholder='City,State or ZIP'
                    onChange={formik.handleChange}
                    value={formik.values.to}
                    name='to'
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
        </form>
    );
};

export { FormFromTo };