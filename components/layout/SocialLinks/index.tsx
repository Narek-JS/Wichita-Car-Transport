import { closeQuoteFormDesktop, openQuoteFormDesktop, selectQuoteFormStatusDesktop } from '@/store/quoteForm';
import { QuoteButtonIcon } from '@/public/assets/svgs/QuoteButtonIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FormQuote } from '@/components/FormQuote';
import { socialIcons } from '@/constants/options';
import { selectMenus } from '@/store/manu';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import useWindowSize from '@/hooks/useWindowSize';
import Portal from '@/components/ui/Portal';
import classNames from 'classnames';
import classes from './index.module.css';

const SocialLinks = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useRouter();
    const { width } = useWindowSize();
    const { data } = useAppSelector(selectMenus);
    const isOpenQuoteFormDesktop = useAppSelector(selectQuoteFormStatusDesktop)

    const openFormPopup = () => dispatch(openQuoteFormDesktop());
    const closeFormPopup = () => dispatch(closeQuoteFormDesktop());

    if(Number(width) <= 1400 || pathname === '/404') return null;

    return (
        <Fragment>
            <div className={classNames(classes.socialLinks, 'socialLinks')}>
                <div className={classes.icon} onClick={openFormPopup}>
                    <p> Get Quote </p>
                    <QuoteButtonIcon {...(isOpenQuoteFormDesktop && { rotate: 180 })} />
                </div>
                { data?.social.map((social, index) => {
                    const IconComponent = socialIcons[social.title];
                    return IconComponent && <IconComponent key={index} />;
                })}
            </div>
            {isOpenQuoteFormDesktop && (
                <Portal onClose={closeFormPopup}>
                    <FormQuote />
                </Portal>
            )}
        </Fragment>
    );
};

export { SocialLinks };