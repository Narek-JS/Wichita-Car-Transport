import { CarService } from '@/components/CarService';
import { Container } from '@/components/ui/container';
import classes from './index.module.css';

const CarMovingServices = () => {
    const carServices = [
        {
            title: 'Dealer Auto Transport',
            description: 'We all know how difficult it is to find the right car for you, which will meet all of your needs and suit your taste.',
            imagePath: '/assets/images/carMovingsImg1.png',
            link: {
                text: 'Read More',
                url: '/'
            }
        },
        {
            title: 'Dealer Auto Transport',
            description: 'We all know how difficult it is to find the right car for you, which will meet all of your needs and suit your taste.',
            imagePath: '/assets/images/carMovingsImg2.png',
            link: {
                text: 'Read More',
                url: '/'
            }
        },
        {
            title: 'Dealer Auto Transport',
            description: 'We all know how difficult it is to find the right car for you, which will meet all of your needs and suit your taste.',
            imagePath: '/assets/images/carMovingsImg3.png',
            link: {
                text: 'Read More',
                url: '/'
            }
        },
        {
            title: 'Dealer Auto Transport',
            description: 'We all know how difficult it is to find the right car for you, which will meet all of your needs and suit your taste.',
            imagePath: '/assets/images/carMovingsImg4.png',
            link: {
                text: 'Read More',
                url: '/'
            }
        },
    ];

    return (
        <section className={classes.carMovingsSection}>
            <Container>
                <h2 className={classes.subTitle}>What we are experts at?</h2>
                <div className={classes.services}>
                    { carServices.map((service, index) => (
                        <CarService key={index} {...service}/>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export { CarMovingServices };