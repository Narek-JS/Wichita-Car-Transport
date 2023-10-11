import { useFormik } from 'formik';
import * as yup from "yup";
import classes from './index.module.css';
import Link from 'next/link';

interface IFormData {
    name: string;
    email: string;
    subject: string;
    message: string
};

const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
};

const Form: React.FC = () => {
    const formik = useFormik<IFormData>({
        initialValues,
        onSubmit: (values) => {
            console.log('values --> ', values);
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            subject: yup.string().required(),
            message: yup.string().required()
        })
    });

    return (
        <form className={classes.form}>
            <input
                className={classes.input}
                name='name'
                placeholder='Name *'
                autoComplete='off'
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            <input
                className={classes.input}
                name='email'
                placeholder='Email Address *'
                autoComplete='off'
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <input
                className={classes.input}
                name='subject'
                placeholder='Subject*'
                autoComplete='off'
                onChange={formik.handleChange}
                value={formik.values.subject}
            />
            <textarea
                className={classes.textarea}
                name='message'
                placeholder='Your Message*'
                autoComplete='off'
                onChange={formik.handleChange}
                value={formik.values.message}
            />
            <div className={classes.btns}>
                <button className={classes.sbmtData}>Submit Now</button>
                <span className={classes.or}>OR</span>
                <Link href={'contact-us'} className={classes.link}>Submit Now</Link>
            </div>
        </form>
    );
};

export { Form };