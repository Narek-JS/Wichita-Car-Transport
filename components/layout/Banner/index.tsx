import { Container } from '@/components/ui/container';
import { useEffect, useRef, useState } from 'react';
import { BannerSlider } from './BannerSlider';
import { eventEmitter } from '@/eventEmitter';
import { FormSteps } from '../FormSteps';
import { useRouter } from 'next/router';

import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';

const Banner: React.FC = () => {
    const { pathname } = useRouter();
    const [bannerContentElm, setBannerContentElm] = useState<null | HTMLDivElement>(null);

    const size = useWindowSize();
    const bannerConentRef = useRef<HTMLDivElement>(null);

    const isNotBanner = (
        pathname === '/blogs' ||
        pathname === '/news' ||
        pathname === '/404'
    );

    useEffect(() => {
        if(bannerConentRef.current !== null) {
            setBannerContentElm(bannerConentRef.current);
        };
    }, [size]);

    eventEmitter.subscribe('dropdownStatus', (status) => {
        if(bannerConentRef.current !== null) {
            if(status) {
                bannerConentRef.current.style.zIndex = '2'
            } else {
                bannerConentRef.current.style.zIndex = '1'
            };
        };
    });

    if(isNotBanner) return null; 

    return (
        <section>
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