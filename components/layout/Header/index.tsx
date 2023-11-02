import { useScrollPositionWindow } from '@/hooks/useScrollPositionWindow';
import { selectQuoteFormMobileStatus } from '@/store/quoteForm';
import { Container } from '@/components/ui/container';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { Fragment, useEffect, useState } from 'react';
import { Redirect } from '@/components/Redirect';
import { useGetMenusQuery } from '@/store/manu';
import { useAppSelector } from '@/store/hooks';
import { Burger } from '@/components/Burger';
import { FormSteps } from '../FormSteps';
import { useRouter } from 'next/router';
import { Search } from '../../Search';
import { Nav } from './Nav';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import Dropdown from '@/components/ui/Dropdown';
import classes from './index.module.css';

const Header: React.FC = () => {
    const { pathname, query } = useRouter();
    const { isLoading, data, error } = useGetMenusQuery('menus');
    const [ isContentDesktopFixed, setIsContentDesktopFixed ] = useState(false);
    const scrollPosition = useScrollPositionWindow();
    const isOpen = useAppSelector(selectQuoteFormMobileStatus);

    useEffect(() => {
        if (scrollPosition >= 50 && !isContentDesktopFixed) {
            setIsContentDesktopFixed(true);
        } else if (scrollPosition < 50 && isContentDesktopFixed) {
            setIsContentDesktopFixed(false);
        };
    }, [scrollPosition]);

    const isBanner = (
        pathname === '/blogs' ||
        pathname === '/news' ||
        pathname === '/404' ||
        pathname === '/customer-reviews' ||
        query.dynamicPage
    );

    if(error !== undefined) return <Redirect to='/404'/>

    return (
        <Fragment>
            {isLoading && <LoadingUI type='fullPage' />}
            <header className={classes.header}>
                <Nav />
                <div className={classNames(classes.informationBar, { [classes.informationBarBg]: isContentDesktopFixed || isBanner })}>
                    <Container>
                        <div className={classes.contentDesktop}>
                            <Link href='/'>
                                <Image
                                    src={"/assets/images/logo.png"}
                                    alt="logo"
                                    className={classes.logo}
                                    width={190}
                                    height={100}
                                    priority
                                />
                            </Link>
                            <ul className={classes.ul}>
                                { data?.items.map((item) => (
                                    item.children?.isEmpty() ? (
                                        <Link
                                            className={classNames(classes.link, {
                                                [classes.activeLink]: pathname === '/' + item.url
                                            })}
                                            key={item.id}
                                            href={item?.url || ''}
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Dropdown
                                            key={item.id}
                                            label={item.title || ''}
                                            items={item.children!.map(({ url, title, children }) => ({
                                                link: url!,
                                                label: title!,
                                                ...(!item.children?.isEmpty() && { children })
                                            }))}
                                        />
                                    )
                                ))}
                            </ul>
                            <Search />
                        </div>
                        <div className={classes.contentMobile}>
                            <Link href='/'>
                                <Image
                                    src={"/assets/images/logo.png"}
                                    alt="logo"
                                    className={classes.logo}
                                    width={190}
                                    height={100}
                                    priority
                                />
                            </Link>
                            <Burger />       
                        </div>
                    </Container>
                </div>
                { isOpen && (
                    <div className={classNames(classes.fullScreen, 'fullScreen')}>
                        <Container>
                            <FormSteps />
                        </Container>
                    </div>
                )}
            </header>
        </Fragment>
    );
};

export { Header };