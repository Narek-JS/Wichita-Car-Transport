import { useEffect, useRef, useState } from 'react';
import { BannerSlider } from './BannerSlider';
import { Container } from '@/components/ui/container';
import { FormSteps } from '../FormSteps';

import classes from './indx.module.css';
import useWindowSize from '@/hooks/useWindowSize';

const Banner: React.FC = () => {
    const bannerConentRef = useRef<HTMLDivElement>(null);
    const [ bannerContentElm, setBannerContentElm ] = useState<null | HTMLDivElement>(null);
    const size = useWindowSize();

    useEffect(() => {
        if(bannerConentRef.current !== null) {
            setBannerContentElm(bannerConentRef.current);
        };
    }, [size]);

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