import { FeedbackForm } from '../CustomerReviews/FeedbackForm';
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { ScrollTopIcon } from './ScrollTopIcon';
import { SideBarMenu } from './SideBarMenu';
import { SocialLinks } from './SocialLinks';
import { Ubuntu } from 'next/font/google';
import { Header } from './Header';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Fragment } from 'react';
import { store } from '@/store';
import Head from 'next/head';

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
    return (
        <Fragment>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <main className={ubuntuFont.className}>
                <ReduxProvider store={store}>
                    <Header />
                    <Banner />
                    <FeedbackForm />
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