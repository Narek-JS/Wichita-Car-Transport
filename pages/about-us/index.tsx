import { Fragment } from 'react';
import { metaTags } from '@/constants/metaTags';
import { HelpSection } from '@/components/HelpSection';
import { Container } from '@/components/ui/container';
import { useScrollToView } from '@/hooks/useScrollToView';
import Head from 'next/head';
import classes from './index.module.css';
import Image from 'next/image';

export default function AboutUs() {
    const sectionRef = useScrollToView<HTMLDivElement>();
    const aboutUsContent = [
        {
            textes: [
                'Wichita Car Transport opened for business 14 years ago in 2006. In the decade plus that our company has operated, we grew from a small, local operation into a national car transport business.',
                'Today, we serve customers in all 50 states and lead the industry with our convenient service and affordable prices. We achieved this success by providing excellent customer service that defines our reputation.'
            ],
            images: '/assets/images/aboutUsImage.png'
        },
        {
            textes: [
                'Back in 2006, our founder created Wichita Car Transport on one basic principle: to serve the needs of our customers. It proved a winning philosophy as more and more customers flocked to our small operation. As a result, we steadily expanded. As the company grew, we ensured that its size didn’t overshadow that core responsibility. We truly believe doing the best for our customers is the best course of action for us.'
            ]
        },
        {
            textes: [
                'How do we manifest that principle? We start by offering the most competitive prices in the auto shipping business. Prioritizing affordability provided the volume that justified the cheap prices. Put simply, we do so much business we can afford to undercut the competition. If you receive a quote from another auto shipper, bring it to us and we’ll beat it. Wichita Car Transport is committed to providing the most affordable car shipping service in the country.'
            ]
        },
        {
            textes: [
                'However, price is only half the benefit of using our services. We pair our affordability with a customer service experience totally unmatched in the field. That means we maintain contact with you for the duration of the shipment. Any question you have we answer. Our agents add personal touch, working with you through any hurdles. Furthermore, the drivers we employ exhibit the expertise and knowhow to tackle any difficulty with ease. In their hands, your car ships safely and expediently to any destination in the US.'
            ]
        },
        {
            textes: [
                'Which leads to our final point: Wichita Car Transport ships cars to any location in the entire country. That includes Hawaii and Alaska. Our routes connect any two points in the United States. We established a complete network so you don’t have to worry about shipping to obscure locations. Furthermore, all shipments pick up at your address and deliver directly to the door of your new one. Door to door shipping is standard with us. We also ship any sort of vehicle. Whether you want extra protection for an exotic car or need assistance with an inoperable one, the car movers working for Wichita Car Transport have you covered.'
            ]
        },
        {
            textes: [
                'So, now you’ve learned a bit about us, let’s learn about your needs. Give us a call today at (316) 247-8958 of fill out our contact us to get started on your Wichita Car Transport!'
            ]
        },
    ]

    return (
        <Fragment>
        <Head>{metaTags.aboutUs}</Head>
        <section className={classes.section} ref={sectionRef}>
            <Container>
                <h1 className={classes.title}>About Us</h1>
                { aboutUsContent.map((sectionContent, index) => (
                    <div className={classes.rowNode} key={index}>
                        { sectionContent.textes?.length && (
                            <div className={classes.textNode}>
                                { sectionContent.textes.map((text, textIndex) => (
                                    <p key={textIndex}>{text}</p>
                                ))}
                            </div>
                        )}
                        { sectionContent?.images && (
                            <Image
                                src={sectionContent.images}
                                alt="About Us Image"
                                className={classes.image}
                                width={470}
                                height={220}
                            />
                        )}
                    </div>
                ))}
            </Container>
        </section>
        <HelpSection />
        </Fragment>
    );
};
