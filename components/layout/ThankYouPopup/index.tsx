import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeThankYou, selectThankYouStatus } from '@/store/thankYou';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import classes from './index.module.css';

const ThankYouPopup: React.FC = () => {
    const isOpen = useAppSelector(selectThankYouStatus);
    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(closeThankYou());
    };

    if(!isOpen) return null;

    return (
        <div className={classes.overlay}>
            <div className={classNames(classes.portal, 'portal')}>
                <div className={classes.content}>
                    <div className={classes.leftNode}>
                        <h2>Thank You</h2>
                        <p>
                            Thank you for your shipping quote request. We will get back to you very shortly with the most competitive pricing and truck space availability. In the meantime, feel free to call us directly at <Link href='tel: (316) 247-8958'>(316) 247-8958</Link> or <Link href='/contact-us'>contact us</Link> and one of our live agents will be able to assist you with all your shipping needs!
                        </p>
                        <button onClick={onClose}>
                            Ok Good!
                        </button>
                    </div>
                    <div className={classes.rightNode}>
                        <Image
                            width={430}
                            height={430}
                            className={classes.image}
                            src='/assets/images/thank-you.png'
                            alt='Thank you Image'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ThankYouPopup };