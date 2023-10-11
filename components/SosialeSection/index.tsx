import { Container } from '@/components/ui/container';
import { StarIcon } from '@/public/assets/svgs/StarIcon';
import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import Image from 'next/image';
import classes from './index.module.css';

interface ILinksReviewSocial {
    id: number;
    image: string;
    name: string;
    link: string
};

const SosialeSection: React.FC = () => {
    const { width } = useWindowSize();

    const linksReviesSocial: Array<ILinksReviewSocial> = [
        {
            id: 1,
            image: '/assets/images/googleIconSocialSection.png',
            name: 'Google',
            link: 'https://www.google.com/search?safe=active&hl=en&sxsrf=ACYBGNRLLhoCmKi9QI-aTbuoKmckfoRbTQ%3A1569260684261&source=hp&ei=jASJXdyxDZPr9APgt5PwCg&q=columbus+auto+transport&oq=Columbus+Auto+Transport&gs_l=psy-ab.1.0.35i39j0i22i30l2.802.802..1704...0.0..0.106.106.0j1......0....2j1..gws-wiz.FGC6DqN_4DE#bsht=Cgdic2h3Y2hwEgQIBDAB'
        },
        {
            id: 2,
            image: '/assets/images/youtubeIconSocial.png',
            name: 'YouTube',
            link: 'https://www.youtube.com/watch?v=bezmTmpG00U'
        },
        {
            id: 3,
            image: '/assets/images/yelpIconSocilaSection.png',
            name: 'Yelp',
            link: 'https://www.yelp.com/biz/washington-dc-auto-transport-washington-2'
        }
    ];

    if(Number(width) <= 991) return null;

    return (
        <section className={classes.sosialeSection}>
            <Container>
                <h2 className={classes.subTitle}>Check out more reviews and likes on:</h2>
                <div className={classes.sosialGroup}>
                    { linksReviesSocial.slice(0, 3).map(sosial => (
                        <div className={classes.sosial} key={sosial.id}>
                            <div className={classes.icons}>
                                <Link href={sosial.link}>
                                    <Image
                                        src={sosial.image}
                                        alt="social icon"
                                        width={62}
                                        height={62}
                                        style={{ aspectRatio: '62/62' }}
                                    />
                                </Link>
                                {new Array(5).fill(1).map((_, i) => (
                                    <StarIcon key={i}/>
                                ))}
                            </div>
                            <p className={classes.sosialName}>{sosial.name}</p>
                            <Link href={sosial.link} className={classes.seeMore}>See More <ArrowIcon rotate={-90} /> </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export { SosialeSection };