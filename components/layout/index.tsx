import React, { Fragment } from 'react';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store';
import { Header } from './Header';
import { Banner } from './Banner';
import { SideBarMenu } from './SideBarMenu';
import { Footer } from './Footer';
import { SocialLinks } from './SocialLinks';
import { useRouter } from 'next/router';
import { ScrollTopIcon } from './ScrollTopIcon';
import { Ubuntu } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

const ubuntuFont = Ubuntu({
  weight: '400',
  subsets: ['latin'],
  style: 'normal'
});

interface IProps {
  pageTitle?: string;
  children: React.ReactNode;
};

const Layout: React.FC<IProps> = ({ children, pageTitle = 'New York' }) => {
    const { pathname } = useRouter();
    
    const isBanner = (
        pathname === '/blogs' ||
        pathname === '/news' ||
        pathname === '/404' ||
        pathname === '/customer-reviews'
    );

    return (
        <Fragment>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <main className={ubuntuFont.className}>
                <ReduxProvider store={store}>
                    <Header />
                    {!isBanner && <Banner />}
                    <SideBarMenu />
                    <SocialLinks />
                    <ToastContainer />
                    {children}
                    <ScrollTopIcon />
                    <Footer />
                </ReduxProvider>
            </main>
        </Fragment>
    )
};

export default Layout;