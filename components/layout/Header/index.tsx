import { Container } from '@/components/ui/container';
import { useGetMenusQuery } from '@/store/manu';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { Nav } from './Nav';
import { Redirect } from '@/components/Redirect';
import { Search } from '../../Search';
import { useScrollPositionWindow } from '@/hooks/useScrollPositionWindow';
import { useEffect, useState } from 'react';
import { Burger } from '@/components/Burger';
import { useAppSelector } from '@/store/hooks';
import { selectQuoteFormMobileStatus } from '@/store/quoteForm';
import { FormSteps } from '../FormSteps';
import { useRouter } from 'next/router';
import Dropdown from '@/components/ui/Dropdown';
import classes from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

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
    if(isLoading) return <LoadingUI type='fullPage' />;

    return (
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
                                        items={item.children!.map(({ url, title }) => ({
                                            link: url!,
                                            label: title!
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
    );
};

export { Header };