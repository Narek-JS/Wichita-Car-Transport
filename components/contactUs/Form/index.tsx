import { useFormik } from 'formik';
import { SmallTrucForRecapcha } from '@/public/assets/svgs/SmallTrucForRecapcha';
import { SmallOpenTrucForRecapcha } from '@/public/assets/svgs/SmallOpenTrucForRecapcha';
import { ArrowForBtn } from '@/public/assets/svgs/ArrowForBtn';
import { useState, useEffect, Fragment } from 'react';
import { RecapchaWinStar } from '@/public/assets/svgs/RecapchWinStar';
import { TextField } from '@mui/material';
import { hendleTypeRemoveSpace } from '@/helper/strings';
import { useContactUsMutation } from '@/store/contactUs';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { toast } from 'react-toastify';
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

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    subject: yup.string().required(),
    message: yup.string().required()
});

const Form: React.FC = () => {
    const [ isCheckRecapchaAnswer, setIsCheckRecapchaAnswer ] = useState<Boolean | null>(null);
    const [ onSubmit, { isLoading, data, isError } ] = useContactUsMutation();

    const formik = useFormik<IFormData>({
        initialValues,
        onSubmit,
        validationSchema 
    });

    useEffect(() => {
        if(isError) {
            toast.error('sorry something is wrong', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if(data?.action) {
            formik.resetForm();
            setIsCheckRecapchaAnswer(null);
            toast.success('your message is successfully sent', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if(data?.action === false) {
            toast.error('sorry something is wrong', {
                position: toast.POSITION.TOP_RIGHT
            });
        };
    }, [data, isError]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(formik.isValid === false || !formik.values.name) {
            formik.handleSubmit(event);
        } else if (isCheckRecapchaAnswer !== false) {
            setIsCheckRecapchaAnswer(true);
        } else {
            formik.handleSubmit(event);
        };
    };

    const handleRecapchaChange = (status: boolean) => {
        if(isCheckRecapchaAnswer !== false) {
            setIsCheckRecapchaAnswer(status);
        };
    };

    const handleChange = (event) => {
        hendleTypeRemoveSpace(event);
        formik.handleChange(event);
    };

    const getTextFieldOptions = (name: string, label: string): any => ({
        helperText: formik.touched?.[name] && formik.errors?.[name],
        error: formik.touched?.[name] && formik.errors?.[name],
        classNames: classes.textField,
        value: formik.values?.[name],
        onChange: handleChange,
        variant: 'standard',
        label, name,
    });

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <p className={classes.description}>You can contact Wichita Car Transport using the following details:</p>
            <div className={classes.frstLine}>
                <TextField {...getTextFieldOptions('name', 'your Name *')} />
                <TextField {...getTextFieldOptions('email', 'Your Email *')} />
                <TextField {...getTextFieldOptions('phone', 'Your Phone *')} />
                <TextField {...getTextFieldOptions('subject', 'Subject *')} />
            </div>
            <div className={classes.seccondLine}>
                <TextField
                    error={Boolean(formik?.touched?.message && formik.errors?.message)}
                    helperText={formik?.touched?.message && formik.errors?.message}
                    className={classNames(classes.textField, classes.textarea)}
                    inputProps={{ style: { height: '100%' } }}
                    onChange={(event) => {
                        hendleTypeRemoveSpace(event)
                        formik.handleChange(event);
                    }}
                    id="outlined-multiline-static"
                    value={formik.values.message}
                    name='message' rows={4}
                    label="Your Message *" 
                    multiline
                />
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
                        <div className={classes.box} onClick={() => handleRecapchaChange(false)}>
                            {isCheckRecapchaAnswer !== false  ? <SmallTrucForRecapcha /> : <RecapchaWinStar /> }
                        </div>
                        <div className={classes.box} onClick={() => handleRecapchaChange(true)}>
                            <SmallOpenTrucForRecapcha />
                        </div>
                    </div>
                    { isCheckRecapchaAnswer &&
                        <p className={classes.errorRecaptcha}>Please choose one of this option</p>
                    }
                </div>
                <button className={classes.btn} type='submit'>
                    {isLoading && <LoadingUI type='roundSmall' />}
                    {!isLoading && (
                        <Fragment>
                            <ArrowForBtn />
                            Send
                        </Fragment>
                    ) }
                </button>
            </div>
        </form>
    );
};

export { Form };