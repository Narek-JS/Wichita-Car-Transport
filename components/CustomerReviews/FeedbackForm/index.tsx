import { useState } from 'react';
import { ActiveStareIcon } from '@/public/assets/svgs/ActiveStareIcon';
import { Container } from '@/components/ui/container';
import { CloseIconReviewPopup } from '@/public/assets/svgs/CloseIconReviewPopup';
import { useFormik } from 'formik';
import { DislikeIcon } from '@/public/assets/svgs/DislikeIcon';
import { LikeIconReview } from '@/public/assets/svgs/LikeIconReview';
import { DisableStarIcon } from '@/public/assets/svgs/DisableStarIcon';
import * as yup from "yup";
import Recaptcha from "react-google-recaptcha";
import Image from 'next/image';
import classNames from 'classnames';
import classes from './index.module.css';

interface IFormData {
    name: string,
    email: string,
    year: string,
    make: string,
    model: string,
    pickUp: string,
    dropOff: string,
    message: string,
};

const initialValues = {
    name: '',
    email: '',
    year: '',
    make: '',
    model: '',
    pickUp: '',
    dropOff: '',
    message: ''
};

interface IProps {
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeedbackForm: React.FC<IProps> = ({ setIsOpenForm }) => {
    const [ like, setLike ] = useState<boolean | null>(null);
    const [ ratingCount, setRatingCount ] = useState<0 | 1 | 2 | 3 | 4 | 5 | any>(0);
    
    const formik = useFormik<IFormData>({
        initialValues,
        onSubmit: (values) => {
            console.log('values --> ', values);
        },
        validationSchema: yup.object({
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
            pickUp: yup.string().required(),
            dropOff: yup.string().required(),
        })
    });

    return (
        <div className={classNames(classes.feedbackForm, 'feedbackForm')}>
            <Container>
                <div className={classes.content}>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <h2 className={classes.fomrTitle}>Submit a Review</h2>
                        <div className={classes.wrapperInput}>
                            <input
                                className={classes.input}
                                name='name'
                                placeholder='Name *'
                                autoComplete='off'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            { formik.errors.name && <span className={classes.error}>{formik.errors.name}</span> }
                        </div>
                        <div className={classes.wrapperInput}>
                            <input
                                className={classes.input}
                                name='email'
                                placeholder='Email Address *'
                                autoComplete='off'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            { formik.errors.email && <span className={classes.error}>{formik.errors.email}</span> }
                        </div>
                        <div className={classes.vihacleList}>
                            <div className={classes.wrapperInput}>
                                <input
                                    className={classes.input}
                                    name='year'
                                    placeholder='Year *'
                                    autoComplete='off'
                                    onChange={formik.handleChange}
                                    value={formik.values.year}
                                />
                                { formik.errors.year && <span className={classes.error}>{formik.errors.year}</span> }
                            </div>
                            <div className={classes.wrapperInput}>
                                <input
                                    className={classes.input}
                                    name='make'
                                    placeholder='Make *'
                                    autoComplete='off'
                                    onChange={formik.handleChange}
                                    value={formik.values.make}
                                />
                                { formik.errors.make && <span className={classes.error}>{formik.errors.make}</span> }
                            </div>
                            <div className={classes.wrapperInput}>
                                <input
                                    className={classes.input}
                                    name='model'
                                    placeholder='Model *'
                                    autoComplete='off'
                                    onChange={formik.handleChange}
                                    value={formik.values.model}
                                />
                                { formik.errors.model && <span className={classes.error}>{formik.errors.model}</span> }
                            </div>
                        </div>
                        <div className={classes.locations}>
                            <div className={classes.wrapperInput}>
                                <input
                                    className={classes.input}
                                    name='pickUp'
                                    placeholder='Pick-Up Location'
                                    autoComplete='off'
                                    onChange={formik.handleChange}
                                    value={formik.values.pickUp}
                                />
                                { formik.errors.pickUp && <span className={classes.error}>{formik.errors.pickUp}</span> }
                            </div>
                            <div className={classes.wrapperInput}>
                                <input
                                    className={classes.input}
                                    name='dropOff'
                                    placeholder='Drop-Off Location'
                                    autoComplete='off'
                                    onChange={formik.handleChange}
                                    value={formik.values.dropOff}
                                />
                                { formik.errors.dropOff && <span className={classes.error}>{formik.errors.dropOff}</span> }
                            </div>
                        </div>
                        <textarea
                            className={classes.textarea}
                            name='message'
                            placeholder='Your Message*'
                            autoComplete='off'
                            onChange={formik.handleChange}
                            value={formik.values.message}
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
                                    onClick={() => setRatingCount(index + 1)}
                                >
                                    { ratingCount <= index ? <DisableStarIcon  /> : <ActiveStareIcon />}
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

                        <button className={classes.btn} type='submit'>Submit</button>
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
                    <div className={classes.closeForm} onClick={() => setIsOpenForm(false)}>
                        <CloseIconReviewPopup />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export { FeedbackForm };