import { CloseIconReviewPopup } from '@/public/assets/svgs/CloseIconReviewPopup';
import { IFeedbackFormData, TStarCountsId } from '@/model/customerReviews';
import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { ActiveStareIcon } from '@/public/assets/svgs/ActiveStareIcon';
import { DisableStarIcon } from '@/public/assets/svgs/DisableStarIcon';
import { LikeIconReview } from '@/public/assets/svgs/LikeIconReview';
import { DislikeIcon } from '@/public/assets/svgs/DislikeIcon';
import { useGetOptionsApiQuery } from '@/store/optionsByZip';
import { hendleTypeRemoveSpace } from '@/helper/strings';
import { Container } from '@/components/ui/container';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { useAppSelector } from '@/store/hooks';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {
  selectCustomerReviewsFormStatus,
  useGetCustomerReviewsQuery,
  useAddFeedbackMutation,
  handleCloseForm,
} from '@/store/customerReviews';

import Recaptcha from "react-google-recaptcha";
import classNames from 'classnames';
import Image from 'next/image';
import * as yup from "yup";

import classes from './index.module.css';

const initialValues = {
    name: '',
    email: '',
    year: '',
    make: '',
    model: '',
    pick_up: '',
    drop_off: '',
    tell_us: ''
};

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    year: yup.number()
        .typeError('Year must be a number')
        .integer('Year must be an integer')
        .min(2000, 'must be least 2000')
        .max(new Date().getFullYear(), 'Year cannot exceed the current year')
        .required('Year is required'),
    make: yup.string().required('Make is required'),
    model: yup.string().required('Model is required'),
    pick_up: yup.string().required(),
    drop_off: yup.string().required(),
});

const FeedbackForm: React.FC = () => {
    const dispatch = useDispatch();
    const isShow = useAppSelector(selectCustomerReviewsFormStatus).isOpen;
    const [ addFeetback, { isLoading, isError, isSuccess } ] = useAddFeedbackMutation();
    const [ like, setLike ] = useState<boolean | null>(null);
    const [ ratingCount, setRatingCount ] = useState<TStarCountsId>(0);
    const [ isSelectedIndex, setIsSelectedIndex ] = useState<TStarCountsId>(0);
    const [ pollingInterval, setPollingInterval ] = useState<number>(Infinity);

    useGetCustomerReviewsQuery('reviews', {
        pollingInterval,
        skip: !isShow
    }); 

    const formik = useFormik<IFeedbackFormData>({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            addFeetback({
                ...values,
                like_dislike: like ? 1 : 0,
                star: isSelectedIndex
            });
        },
    });

    const { isLoading: loadingPick_up, data: optionsPick_up } = useGetOptionsApiQuery(
        formik.values.pick_up, { skip: !formik.values.pick_up }
    );

    const { isLoading: loadingDrop_off, data: optionsDrop_off } = useGetOptionsApiQuery(
        formik.values.drop_off, { skip: !formik.values.drop_off }
    );

    useEffect(() => {
        if(isError) {
            toast.error('sorry something is wrong', {
                position: toast.POSITION.TOP_RIGHT
            });
        };

        if(isSuccess) {
            closeForm();

            setPollingInterval(100);
            setTimeout(() => {
                setPollingInterval(Infinity);
            }, 200);

            toast.success('your feedback have successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
        };

    }, [isError, isSuccess]);

    function closeForm() {
        formik.resetForm();
        formik.setTouched({});
        setLike(null);
        setRatingCount(0);
        setIsSelectedIndex(0);
        dispatch(handleCloseForm());
    };

    const getPropsTextFaild = (name: string, label: string): TextFieldProps => ({
        onChange: (event) => {
            hendleTypeRemoveSpace(event);
            formik.handleChange(event);
        },
        error: Boolean(formik.touched?.[name] && formik.errors?.[name]),
        helperText: formik.touched?.[name] && formik.errors?.[name],
        InputLabelProps: { style: { color: '#A1A1A2' } },
        value: formik.values?.[name],
        className: classes.input,
        variant: 'standard',
        label, name,
    });

    if(!isShow) return null;

    return (
        <div className={classNames(classes.feedbackForm, 'feedbackForm')}>
            <Container>
                <div className={classes.content}>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <h2 className={classes.fomrTitle}>Submit a Review</h2>
                        <div className={classes.wrapperInput}>
                            <TextField {...getPropsTextFaild('name', 'Name *')} />
                        </div>
                        <div className={classes.wrapperInput}>
                            <TextField {...getPropsTextFaild('email', 'Email Address *')} />
                        </div>
                        <div className={classes.vihacleList}>
                            <div className={classes.wrapperInput}>
                                <TextField {...getPropsTextFaild('year', 'Year *')} />
                            </div>
                            <div className={classes.wrapperInput}>
                                <TextField {...getPropsTextFaild('make', 'Make *')} />
                            </div>
                            <div className={classes.wrapperInput}>
                                <TextField {...getPropsTextFaild('model', 'Model *')} />
                            </div>
                        </div>
                        <div className={classes.locations}>
                            <div className={classes.wrapperInput}>
                                <Autocomplete
                                    className={'autocomplete'}
                                    options={optionsPick_up?.data || []}
                                    clearOnBlur={false}
                                    loading={loadingPick_up}
                                    value={formik.values.pick_up}
                                    renderInput={(params) => <TextField
                                        error={Boolean(formik.touched?.pick_up && formik.errors?.pick_up)}
                                        helperText={formik.touched?.pick_up && formik.errors?.pick_up}
                                        variant='standard'
                                        onSelect={(event) => {
                                            hendleTypeRemoveSpace(event);
                                            formik.handleChange(event);
                                        }}
                                        name='pick_up'
                                        {...params}
                                        placeholder="Pick-Up Location"
                                    />}
                                />
                                
                            </div>
                            <div className={classes.wrapperInput}>
                                <Autocomplete
                                    className={'autocomplete'}
                                    options={optionsDrop_off?.data || []}
                                    clearOnBlur={false}
                                    loading={loadingDrop_off}
                                    value={formik.values.drop_off}
                                    renderInput={(params) => <TextField
                                        error={Boolean(formik.touched?.drop_off && formik.errors?.drop_off)}
                                        helperText={formik.touched?.drop_off && formik.errors?.drop_off}
                                        variant='standard'
                                        onSelect={(event) => {
                                            hendleTypeRemoveSpace(event);
                                            formik.handleChange(event);
                                        }}
                                        name='drop_off'
                                        {...params}
                                        placeholder="Pick-Up Location"
                                    />}
                                />
                            </div>
                        </div>
                        <TextField
                            name='tell_us'
                            onChange={(event) => {
                                hendleTypeRemoveSpace(event);
                                formik.handleChange(event);
                            }}
                            value={formik.values.tell_us}
                            className={classes.textArea}
                            error={Boolean(formik.errors.tell_us)}
                            helperText={formik.errors.tell_us}
                            id="outlined-multiline-static"
                            label="Your Message*"
                            multiline
                            rows={4}
                            inputProps={{
                                style: { height: '100%', width: '100%' }
                            }}
                        />
                        <div className={classes.recommend}>
                            <p>Do you recommend our services to a friend?</p>
                            <i onClick={() => setLike(true)}>
                                <LikeIconReview
                                    {...(like !== null && { color: like ? '#00A800' : '#99BAC9' })}
                                />
                            </i>
                            <i onClick={() => setLike(false)}>
                                <DislikeIcon
                                    {...(like !== null && { color: like === true ? '#99BAC9' : '#DDC00C' })}
                                />
                            </i>
                        </div>

                        <div className={classes.rating}>
                            {[...new Array(5)].map((_, index) => (
                                <i
                                    key={index}
                                    onClick={() => {
                                        setIsSelectedIndex(index + 1 as TStarCountsId);
                                        setRatingCount(index + 1 as TStarCountsId);

                                    }}
                                    onMouseEnter={() => setRatingCount(index + 1 as TStarCountsId)}
                                    onMouseLeave={() => setRatingCount(0)}
                                >
                                    { (ratingCount === 0 ? isSelectedIndex : ratingCount) <= index ? <DisableStarIcon  /> : <ActiveStareIcon />}
                                </i>
                            ))} 
                        </div>

                        <div className={classes.recapcha}>
                            <Recaptcha
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || 'asdsad54sad4'}
                                onChange={(token) => {
                                    console.log("reCAPTCHA token:", token);
                                }}
                            />
                        </div>

                        <button
                            className={classes.btn}
                            type='submit'
                        >
                            {isLoading && <LoadingUI type='roundSmall' />}
                            {!isLoading && 'Submit'}
                        </button>
                    </form>
                    <div className={classes.imageNode}>
                        <Image
                            src={'/assets/images/reviewFormImage.png'}
                            alt={'Image'}
                            className={classes.image}
                            width={570}
                            height={670}
                        />
                    </div>
                    <div className={classes.closeForm} onClick={closeForm}>
                        <CloseIconReviewPopup />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export { FeedbackForm };