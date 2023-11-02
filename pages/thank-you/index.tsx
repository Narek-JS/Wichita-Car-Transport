import { ThankYouTextIcon } from '@/public/assets/svgs/ThankYouTextIcon';
import { useScrollToView } from '@/hooks/useScrollToView';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Container } from '@/components/ui/container';
import { metaTags } from '@/constants/metaTags';
import { Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import classes from './index.module.css';

export default function ThankYou() {
    const sectionRef = useScrollToView();

    return (
        <Fragment>
        <Head>{metaTags.thankYou}</Head>
        <section className={classes.section} ref={sectionRef}>
            <Container>
                <h1 className={classes.title}>Thank You!</h1>
                <div className={classes.content}>
                    <div className={classes.text}>
                        <ThankYouTextIcon />
                        <p>Thank you for your shipping quote request. We will get back to you very shortly with the most competitive pricing and truck space availability. In the meantime, feel free to call us directly at <Link href='tel:(408)-478-9788'>(408)-478-9788</Link> and one of our live agents will be able to assist you with all your shipping needs!</p>
                    </div>
                </div>
                <div className={classes.images}>
                    <div className={classes.videoNode}>
                        <VideoPlayer videoId='P6BaAluL4J8'/>
                    </div>
                    <Image
                        src='/assets/images/thankYouImage.png'
                        alt='calculeted Center Icon'
                        className={classes.image}
                        width={468}
                        height={396}
                    />
                </div>
            </Container>
        </section>
        </Fragment>
    );
};
