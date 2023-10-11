import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMenus } from '@/store/manu';
import { EarringIcon } from '@/public/assets/svgs/EarringIcon';
import { MailIcon } from '@/public/assets/svgs/MailIcon';
import { GetQuoteButton } from '@/public/assets/svgs/GetQuoteButton';
import { closeQuoteFormMobile, openQuoteFormMobile, selectQuoteFormMobileStatus } from '@/store/quoteForm';
import { closeSidebar, selectSiteBarStatus } from '@/store/siteBar';
import { useScrollPositionWindow } from '@/hooks/useScrollPositionWindow';
import { useRouter } from 'next/router';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import classNames from 'classnames';
import classes from './index.module.css';

const Nav: React.FC = () => {
    const { pathname, query } = useRouter();
    const { width } = useWindowSize();
    const { data } = useAppSelector(selectMenus);
    const [ isContentDesktopFixed, setIsContentDesktopFixed ] = useState(false);
    const isOpenQuoteFormMobile = useAppSelector(selectQuoteFormMobileStatus);
    const scrollPosition = useScrollPositionWindow();
    const isOpenSideBar = useAppSelector(selectSiteBarStatus);
    const dispatch = useAppDispatch();
    const isBanner = (
        pathname === '/blogs' ||
        pathname === '/news' ||
        pathname === '/404' ||
        pathname === '/customer-reviews' ||
        query.dynamicPage
    ); 

    useEffect(() => {
        if (scrollPosition >= 50 && !isContentDesktopFixed) {
            setIsContentDesktopFixed(true);
        } else if (scrollPosition < 50 && isContentDesktopFixed) {
            setIsContentDesktopFixed(false);
        };
    }, [scrollPosition]);

    useEffect(() => {
        if(Number(width) > 768) {
            isOpenQuoteFormMobile && dispatch(closeQuoteFormMobile());
            isOpenSideBar && dispatch(closeSidebar());
        };
    }, [width]);

    const toogleQoutForm = () => {
        dispatch(isOpenQuoteFormMobile ? closeQuoteFormMobile() : openQuoteFormMobile());
    };

    return (
        <nav className={classNames(classes.nav, {
            [classes.informationBarBg]: isContentDesktopFixed || isBanner,
            [classes.informationBarBgBlue]: isOpenSideBar
        })}>
            <Container>
                <div className={classNames(classes.contentDesktop)}>
                    { data?.topHeaderLeftItem?.url &&
                        <Link href={`tel:${data?.topHeaderLeftItem?.url}`} className={classes.dynamicLink}>
                            { data?.topHeaderLeftItem?.title === 'phone' ? <EarringIcon /> : <MailIcon /> }
                            { data?.topHeaderLeftItem?.url }
                        </Link>
                    }
                    <ul className={classes.ul}>
                        { data?.topHeaderCenterItems.map(item => (
                            <li key={item.id} className={classNames(classes.li, {
                                [classes.activeLink]: '/' + item.url === pathname
                            })}>
                                <Link href={item.url || ''}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    { data?.topHeaderRightItem?.url &&
                        <Link href={`tel:${data?.topHeaderRightItem?.url}`} className={classes.dynamicLink}>
                            { data?.topHeaderLeftItem?.title === 'Mail' ?  <EarringIcon /> : <MailIcon /> }
                            { data?.topHeaderRightItem?.url }
                        </Link>
                    }
                </div>
                <div className={classes.contentMobile} onClick={toogleQoutForm}>
                    <GetQuoteButton rotate={isOpenQuoteFormMobile ? 180 : 0}/>
                    Get Quote Open
                </div>
            </Container>
        </nav>
    );
};

export { Nav };