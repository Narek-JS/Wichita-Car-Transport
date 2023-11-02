import { useAddPostCommentMutation } from '@/store/posts/posts';
import { PhoneMaskCustom } from '@/components/ui/PhoneMask';
import { STORAGE_NAMES } from '@/constants/storageNames';
import { hendleTypeRemoveSpace } from '@/helper/strings';
import { ButtonUI } from '@/components/ui/ButtonUI';
import { IPostComment } from '@/model/posts';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import * as yup from "yup";
import classes from './index.module.css';

interface IFormData extends IPostComment {
    checkbox: boolean;
};

const validationSchema: any = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().min(14, "Invalid phone number").matches(new RegExp('[0-9]')).required(),
    email: yup.string().required().matches(
        /[A-z0-9]+@{1}[A-z0-9]+\.[A-z]{2,}$/,
      'Invalid email'
    ),
    comments: yup.string().required(),
    checkbox: yup.bool()
});

const initialValues: IFormData = {
    name: '',
    email: '',
    phone: '',
    comments: '',
    checkbox: false
};

const Comment: React.FC<{ postId: number }> = ({ postId: id }) => {
    const { query: { dynamicPage: slug } } = useRouter();
    const [ addComment, { isLoading, isError, isSuccess } ] = useAddPostCommentMutation();

    const formik = useFormik<IFormData>({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const { checkbox, ...specialValue } = values;
            keepUserDataInBrowser();
            addComment({...specialValue, id});
        }
    });

    useEffect(() => {
        const steamObject = localStorage.getItem(STORAGE_NAMES.USER_COMMENT);
        const userFromStorage = JSON.parse(steamObject || '{}');
        const { email, name } = formik.values;
        formik.setValues({
            ...formik.values,
            email: userFromStorage?.email || email,
            name: userFromStorage?.name || name,
        });
    }, [slug]);

    useEffect(() => {
        if(isError) {
            toast.error('sorry something is wrong', {
                position: toast.POSITION.TOP_RIGHT
            });
        };
        if(isSuccess) {
            formik.resetForm();
            toast.success('your comment have successfully posted', {
                position: toast.POSITION.TOP_RIGHT
            });
        };
    }, [isError, isSuccess]);

    function keepUserDataInBrowser() {
        const { checkbox, email, name } = formik.values;
        if(checkbox) {
            const steamObject = JSON.stringify({ name, email });
            localStorage.setItem(STORAGE_NAMES.USER_COMMENT, steamObject);
        } else {
            localStorage.removeItem(STORAGE_NAMES.USER_COMMENT);
        };
    };

    const getTextFieldOptions = (name: string, label: string): any => ({
        onChange: (event) => {
            hendleTypeRemoveSpace(event);
            formik.handleChange(event);
        },
        FormHelperTextProps: { sx: {
            position: 'absolute',
            bottom: '0px',
        }},
        value: formik.values?.[name],
        name, label,
        className: classes.input,
        variant: 'standard',
        error: Boolean(formik.touched?.[name] && formik.errors?.[name]),
        helperText: formik.touched?.[name] && formik.errors?.[name]
    });

    return (
        <div className={classes.postComment}>
            <h2 className={classes.postCommentTitle}>Leave a Reply</h2>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.wrapperSubmit}>
                    <TextField
                        error={Boolean(formik.touched.comments && formik.errors.comments)}
                        helperText={formik.touched.comments && formik.errors.comments}
                        onChange={formik.handleChange}
                        value={formik.values.comments}
                        className={classes.comment}
                        id="outlined-multiline-static"
                        label="Your comment here..."
                        name='comments'
                        FormHelperTextProps={{ sx: {
                            position: 'absolute',
                            bottom: '-20px',
                            marginLeft: '4px'
                        }}}
                        multiline
                        rows={4}
                    />
                </div>
                <div className={classes.inputs}>
                    <TextField {...getTextFieldOptions('name', 'Name *')} />
                    <TextField {...getTextFieldOptions('email', 'Email Address*')} />
                    <TextField
                        error={Boolean(formik.touched?.phone && formik.errors?.phone)}
                        helperText={formik.touched?.phone && formik.errors?.phone}
                        value={formik.values?.phone}
                        className={classes.input}
                        onChange={(event) => {
                            hendleTypeRemoveSpace(event);
                            formik.handleChange(event);
                        }}
                        InputProps={{
                            inputComponent: PhoneMaskCustom
                        }}
                        FormHelperTextProps={{ sx: {
                            position: 'absolute',
                            bottom: '0px',
                        }}}
                        label='Phone Number*'
                        variant='standard'
                        name='phone'
                    />
                </div>
                <div className={classes.wrapperCheckbox}>
                    <div className={classes.checkNode}>
                        <label className={classes.checkbox}>
                            <input
                                type="checkbox"
                                onChange={formik.handleChange}
                                checked={formik.values.checkbox}
                                name='checkbox'
                                id='checkbox'
                            />
                            <span className={classes.checkmark} />
                        </label>
                        <label className={classes.emailSaveText} htmlFor='checkbox'>
                            Save my name, email, and website in this browser for the next time I comment
                        </label>
                    </div>
                    <ButtonUI
                        classN='transparent'
                        text='Post Comment'
                        width={155}
                        type='submit'
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export { Comment };