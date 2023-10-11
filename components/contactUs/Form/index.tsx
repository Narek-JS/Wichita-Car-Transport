import { useFormik } from 'formik';
import { SmallTrucForRecapcha } from '@/public/assets/svgs/SmallTrucForRecapcha';
import { SmallOpenTrucForRecapcha } from '@/public/assets/svgs/SmallOpenTrucForRecapcha';
import { ArrowForBtn } from '@/public/assets/svgs/ArrowForBtn';
import { useState } from 'react';
import { RecapchaWinStar } from '@/public/assets/svgs/RecapchWinStar';
import * as yup from "yup";
import classes from './index.module.css';
import classNames from 'classnames';

interface IFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string
};

const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
};

const Form: React.FC = () => {
    const [ isCheckRecapchaAnswer, setIsCheckRecapchaAnswer ] = useState<Boolean | null>(null);

    const formik = useFormik<IFormData>({
        initialValues,
        onSubmit: (values) => {
            console.log('values --> ', values);
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            phone: yup.string().required(),
            subject: yup.string().required(),
            message: yup.string().required()
        })
    });

    const selectRecapcha = (bool: Boolean) => setIsCheckRecapchaAnswer(bool);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        isCheckRecapchaAnswer && formik.handleSubmit(event);
    };

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <p className={classes.description}>You can contact Phoenix Car Transport using the following details:</p>
            <div className={classes.frstLine}>
                <div className={classes.wrapperInput}>
                    <input
                        className={classes.input}
                        name='name'
                        placeholder='Your Name *'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors?.name && <span className={classes.error}>{formik.errors.name}</span>}
                </div>
                <div className={classes.wrapperInput}>
                    <input
                        className={classes.input}
                        name='email'
                        placeholder='Your Email *'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors?.email && <span className={classes.error}>{formik.errors.email}</span>}
                </div>
                <div className={classes.wrapperInput}>
                    <input
                        className={classes.input}
                        name='phone'
                        placeholder='Your Phone*'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors?.phone && <span className={classes.error}>{formik.errors.phone}</span>}
                </div>
                <div className={classes.wrapperInput}>
                    <input
                        className={classes.input}
                        name='subject'
                        placeholder='Subject*'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.subject}
                    />
                    {formik.touched.subject && formik.errors?.subject && <span className={classes.error}>{formik.errors.subject}</span>}
                </div>  
            </div>
            <div className={classes.seccondLine}>
                <div className={classes.wrapperInput}>
                    <textarea
                        className={classes.textarea}
                        name='message'
                        placeholder='Your Message*'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    />
                    {formik.touched.message && formik.errors?.message && <span className={classes.error}>{formik.errors.message}</span>}
                </div>
                <div className={classes.recaptcha}>
                    <h2 className={classNames(classes.title, {
                        [classes.titleError]: isCheckRecapchaAnswer,
                        [classes.titleWin]: isCheckRecapchaAnswer === false
                    })}>
                        Which one is Enclosed Car Trailer ?
                    </h2>

                    <div className={classNames(classes.boxes, {
                        [classes.recapchaWin]: isCheckRecapchaAnswer === false
                    })}>
                        <div className={classes.box} onClick={() => isCheckRecapchaAnswer !== false && selectRecapcha(false)}>
                            {isCheckRecapchaAnswer !== false  ? <SmallTrucForRecapcha /> : <RecapchaWinStar /> }
                        </div>
                        <div className={classes.box} onClick={() => isCheckRecapchaAnswer !== false && selectRecapcha(true)}>
                            <SmallOpenTrucForRecapcha />
                        </div>
                    </div>

                </div>
                <button className={classes.btn} type='submit'>
                    <ArrowForBtn />
                    Send
                </button>
            </div>
            { Boolean(Object.keys(formik.errors).length) &&
                <p className={classes.underText}>One or more fields have an error. Please check and try again.</p>
            }
        </form>
    );
};

export { Form };