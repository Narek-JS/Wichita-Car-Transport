import { Container } from '@/components/ui/container';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { useEffect, useRef, useState } from 'react';
import { useGetBannerQuery } from '@/store/banner';
import { Redirect } from '@/components/Redirect';
import { BannerSlider } from './BannerSlider';
import { eventEmitter } from '@/eventEmitter';
import { FormSteps } from '../FormSteps';
import { useRouter } from 'next/router';

import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';
import classNames from 'classnames';

const Banner: React.FC = () => {
    const { pathname } = useRouter();
    const isNotBanner = (
        pathname === '/blogs' ||
        pathname === '/news' ||
        pathname === '/404'
    );

    const [ bannerContentElm, setBannerContentElm ] = useState<null | HTMLDivElement>(null);
    const { isError, isLoading } = useGetBannerQuery('banner', {
        skip: isNotBanner
    });

    const size = useWindowSize();
    const bannerConentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(bannerConentRef.current !== null) {
            setBannerContentElm(bannerConentRef.current);
        };
    }, [size, pathname]);

    eventEmitter.subscribe('dropdownStatus', (status) => {
        if(bannerConentRef.current !== null) {
            if(status) {
                bannerConentRef.current.style.zIndex = '2'
            } else {
                bannerConentRef.current.style.zIndex = '1'
            };
        };
    });

    if(isError && !isNotBanner) return <Redirect to='/404' />;

    return (
        <section className={classNames({ [classes.isNotBanner]: isNotBanner })}>
            { isLoading && <LoadingUI type='fullPage' /> }
            { Number(size.width) > 768 && (
                <div className={classes.banner}>
                    <BannerSlider bannerContentElm={bannerContentElm} />
                </div>
            )}
            <div className={classes.bannerConent} ref={bannerConentRef}>
                <Container>
                    <div className={classes.content}>
                        <FormSteps />
                    </div>
                </Container>
            </div>
        </section>
    );
};

export { Banner };