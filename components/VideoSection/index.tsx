
import { Container } from '@/components/ui/container';
import { Polygon } from '@/public/assets/svgs/Polygon';
import { YouTubeIcon } from '@/public/assets/svgs/YouTubeIcon';
import { LINKS } from '@/constants/links';
import Link from 'next/link';

import classes from './index.module.css';
import Image from 'next/image';

const VideoSection = () => {

    return (
        <section className={classes.videoSection}>
            <Container>
                <h2 className={classes.subTitle}>
                    Our Car Moving Services
                </h2>
                <div className={classes.wrapperSections}>
                    <div className={classes.video}>
                        <div className={classes.videoContainer}>
                            <div className={classes.videoOverlay}>
                                <Image
                                    src={'/assets/images/videoImage.png'}
                                    alt="play"
                                    className={classes.greenTruckImage}
                                    width={600}
                                    height={599}
                                    priority
                                />
                                <Link
                                    target='_blank'
                                    href={LINKS.to_youtube.url}
                                    aria-label={LINKS.to_youtube.ariaLabel}
                                >
                                    <Image
                                        src={'/assets/images/videoPlayImage.png'}
                                        alt="play"
                                        className={classes.playIcon}
                                        width={166}
                                        height={117}
                                        style={{ aspectRatio: '166/117' }}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={classes.seccondSection}>
                        <div className={classes.contentAboutCompany}>
                            <p>
                                <span>Lorem ipsum dolor sit amet consectetur. Cursus tortor amet porta condimentum auctor curabitur et. Ipsum hac vitae urna egestas vitaeget.Lorem ipsum dolor sit amet consectetur.</span>  
                                <span>Lorem ipsum dolor sit amet consectetur. Cursus tortor amet porta condimentum auctor curabitur et. Ipsum hac vitae urna egestas vitaeget.Lorem ipsum dolor sit amet consectetur.  </span>
                            </p>
                        </div>
                        <div className={classes.contentAboutSubscibe}>
                            <i className={classes.firstPolygon}>
                                <Polygon />
                            </i>
                            <p>
                                <Polygon rotate={-90}/>
                                <span> <b>Don’t</b> Forget to <b>Like and</b> Subscribe.</span>
                                <Polygon rotate={-70} />
                            </p>
                            <div className={classes.wrapperLink}>
                                <Link
                                    href={LINKS.to_youtube.url}
                                    aria-label={LINKS.to_youtube.ariaLabel}
                                    className={classes.linkToYouTube}
                                >
                                    <YouTubeIcon />
                                    <span>SUBSCRIBE</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { VideoSection };