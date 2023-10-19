
import { Container } from '@/components/ui/container';
import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';
import { WarningIcon } from '@/public/assets/svgs/WarningIcon';
import { ArrowRightRed } from '@/public/assets/svgs/ArrowRightRed';
import { useAppSelector } from '@/store/hooks';
import { selectHome } from '@/store/home';
import Image from 'next/image';
import classes from './index.module.css';
import Link from 'next/link';

const AboutCompany: React.FC = () => {
    const data = useAppSelector(selectHome).data?.aboutUs;

    return (
        <section className={classes.aboutCompany}>
           <Container>
                <div className={classes.relative}>
                    <h3 className={classes.subtitle}>{data?.sectionName}</h3>
                    <h2 className={classes.title}>{data?.title}</h2>
                    <div className={classes.firstNode}>
                        <div className={classes.fistNodeLeft}>
                            <div className={classes.text}>
                                { data?.description && 
                                    <p dangerouslySetInnerHTML={{ __html: data.description }} />
                                }
                                <button className={classes.redMoreBtn}>
                                    <ArrowIcon /> 
                                    <span>Read More</span>
                                </button>
                            </div>
                            <div className={classes.warning}>
                                <WarningIcon />
                                <p>{data?.noteDescription}</p>
                            </div>
                        </div>
                        
                        {data?.image && (
                            <div className={classes.firstNodeRight}>
                                <Image
                                    src={data?.image}
                                    alt="Vehicle Car Image"
                                    className={classes.image}
                                    width={604}
                                    height={411}
                                />
                            </div>
                        )}
                    </div>
                    <h3 className={classes.subtitle}>{data?.commercialServices.sectionName}</h3>
                    <h2 className={classes.title}>{data?.commercialServices.title}</h2>
                    <div className={classes.seccondNode}>
                        { data?.commercialServices.services.map((service, index) => (
                            <div className={classes.box} key={index}>
                                <div className={classes.boxFirstLine}>
                                    <Image
                                        src={service.serviceIcon}
                                        alt="icon"
                                        className={classes.icon}
                                        width={30}
                                        height={24}
                                    />
                                    <p>{service.serviceTitle}</p>
                                </div>

                                <p className={classes.description}>
                                    {service.serviceDescription}
                                </p>

                                <Link href={service.serviceLink} className={classes.link}>
                                    <ArrowRightRed /> {service.serviceLinkText}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
           </Container>
        </section>
    );
};

export { AboutCompany };