import React, { Fragment } from 'react';
import Head from 'next/head';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store';
import { Header } from './Header';
import { Banner } from './Banner';
import { SideBarMenu } from './SideBarMenu';
import { Footer } from './Footer';
import { SocialLinks } from './SocialLinks';
import { useRouter } from 'next/router';
import { ScrollTopIcon } from './ScrollTopIcon';

const queryClient = new QueryClient();

interface IProps {
  pageTitle?: string;
  children: React.ReactNode;
};

const Layout: React.FC<IProps> = ({ children, pageTitle = 'New York' }) => {
    const { pathname, query } = useRouter();
    
    const isBanner = (
        pathname === '/blogs' ||
        pathname === '/news' ||
        pathname === '/404' ||
        query.dynamicPage ||
        pathname === '/customer-reviews'
    );

    return (
        <Fragment>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <main>
                <ReduxProvider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <Header />
                        {!isBanner && <Banner />}
                        <SideBarMenu />
                        <SocialLinks />
                        {children}
                        <ScrollTopIcon />
                        <Footer />
                    </QueryClientProvider>
                </ReduxProvider>
            </main>
        </Fragment>
    )
};

export default Layout;