import { ButtonUI } from '@/components/ui/ButtonUI';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from "yup";
import classes from './index.module.css';

interface IFormData {
    name: string;
    email: string;
    phone: string;
    comment: string;
    checkbox: boolean;
};

const initialValues = {
    name: '',
    email: '',
    phone: '',
    comment: '',
    checkbox: false
};

const helperTextProps = {
    sx: {
        position: 'absolute',
        bottom: '0px',
    }
}; 

const validationSchema: any = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required().matches(
        /[A-z0-9]+@{1}[A-z0-9]+\.[A-z]{2,}$/,
      'Invalid email'
    ),
    comment: yup.string().required(),
    checkbox: yup.bool().oneOf([true])
});

const Comment = () => {
    const formik = useFormik<IFormData>({
        initialValues,
        onSubmit: (values) => {
            console.log('values --> ', values);
        },
        validationSchema,
    });

    return ( 
        <div className={classes.postComment}>
            <h2 className={classes.postCommentTitle}>Leave a Reply</h2>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.wrapperSubmit}>
                    <TextField
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                        name='comment'
                        className={classes.comment}
                        error={Boolean(formik.touched.comment && formik.errors.comment)}
                        id="outlined-multiline-static"
                        helperText={formik.touched.comment && formik.errors.comment}
                        label="Your comment here..."
                        multiline
                        rows={4}
                        FormHelperTextProps={{
                            sx: {
                                position: 'absolute',
                                bottom: '-20px',
                                marginLeft: '4px'
                            }
                        }}
                    />
                </div>
                <div className={classes.inputs}>
                    <TextField
                        name='name'
                        label='Name *'
                        variant='standard'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        FormHelperTextProps={helperTextProps}
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        className={classes.input}
                    />
                    <TextField
                        name='email'
                        label='Email Address *'
                        variant='standard'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        FormHelperTextProps={helperTextProps}
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        className={classes.input}
                    />
                    <TextField
                        name='phone'
                        label='Phone Number *'
                        variant='standard'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        FormHelperTextProps={helperTextProps}
                        error={Boolean(formik.touched.phone && formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        className={classes.input}
                    />
                </div>
                <div className={classes.wrapperCheckbox}>
                    <div className={classes.checkNode}>
                        <label className={classes.checkbox}>
                            <input
                                type="checkbox"
                                name='checkbox'
                                onChange={formik.handleChange}
                                checked={formik.values.checkbox}
                                id='checkbox'
                            />
                            <span className={classes.checkmark} />
                        </label>
                        <span className={classes.error}>{formik.errors?.checkbox}</span>
                        <label className={classes.emailSaveText} htmlFor='checkbox'>
                            Save my name, email, and website in this browser for the next time I comment
                        </label>
                    </div>
                    <ButtonUI
                        classN='transparent'
                        text='Post Comment'
                        width='max-content'
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
};

export { Comment };