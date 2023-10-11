import { Container } from '@/components/ui/container';
import Image from 'next/image';
import classes from './index.module.css';

const CustomerService: React.FC = () => {
    const services = [
        {
            title: 'New York City Car Transport',
            description: '5 out of 5 Car Dealers agree that our team is the best at swapping units between dealerships.',
            imagePath: '/assets/images/customerServiceImage1.png'
        },
        {
            title: 'New York City Car Transport',
            description: 'If your company car needs reliable shipping, then consider the business who makes your business prosper.',
            imagePath: '/assets/images/customerServiceImage2.png'
        },
        {
            title: 'New York City Car Transport',
            description: '5 out of 5 Car Dealers agree that our team is the best at swapping units between dealerships.',
            imagePath: '/assets/images/customerServiceImage1.png'
        },
        {
            title: 'New York City Car Transport',
            description: 'If your company car needs reliable shipping, then consider the business who makes your business prosper.',
            imagePath: '/assets/images/customerServiceImage2.png'
        },
        {
            title: 'New York City Car Transport',
            description: '5 out of 5 Car Dealers agree that our team is the best at swapping units between dealerships.',
            imagePath: '/assets/images/customerServiceImage1.png'
        },
        {
            title: 'New York City Car Transport',
            description: 'If your company car needs reliable shipping, then consider the business who makes your business prosper.',
            imagePath: '/assets/images/customerServiceImage2.png'
        },
    ];

    return (
        <section className={classes.customerServiceSection}>
            <Image
                src={'/assets/images/customerServiceSectionBg.png'}
                alt='Image About Company'
                className={classes.backgroundImage}
                width={3200}
                height={600}
            />
            <Container>
                <div className={classes.content}>
                    <h1 className={classes.title}>The fields on which we give services</h1>
                    <div className={classes.services}>
                        { services.map((service, index) => (
                            <div className={classes.service} key={index}>
                                <div className={classes.serviceTitle}>
                                    <div className={classes.iconWrapper}>
                                        <Image
                                            src={service.imagePath}
                                            alt='service Icon'
                                            className={classes.serviceIcon}
                                            width={35}
                                            height={35}
                                        />
                                    </div>
                                    <p>{service.title}</p>
                                </div>
                                <p className={classes.description}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export { CustomerService };