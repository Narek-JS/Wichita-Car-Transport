import useWindowSize from '@/hooks/useWindowSize';
import { Container } from '../ui/container';
import { DiscoverStep } from './DiscoverStep';
import { useMemo } from 'react';
import classes from './index.module.css';

const DiscoverSection: React.FC = () => {
    const { width } = useWindowSize();

    const discoverSteps = [
        {
            step: 1,
            imagePath: '/assets/images/discoverstep1Image.png',
            title: 'Location Info',
            description: 'Enter the pick up and delivery locations for your shipment.'
        },
        {
            step: 2,
            imagePath: '/assets/images/discoverstep2Image.png',
            title: 'Vehicle Info',
            description: 'Fill your vehicle’s year, make and model '
        },
        {
            step: 3,
            imagePath: '/assets/images/discoverstep3Image.png',
            title: 'Pick up Date',
            description: 'Choose your preferv date for pick up'
        },
        {
            step: 4,
            imagePath: '/assets/images/discoverstep4Image.png',
            title: 'Shipping method',
            description: 'Enter your prefer shipping method ( prices are different )'
        },
        {
            step: 5,
            imagePath: '/assets/images/discoverstep4Image.png',
            title: 'Vehicle Condition',
            description: 'Choose option is your vehicle running or no ( prices are different )'
        },
        {
            step: 6,
            imagePath: '/assets/images/discoverstep4Image.png',
            title: 'Contact Info',
            description: 'Fill your contact information and we will get to you the quoted price'
        },
    ];

    const spletedDiscoverSteps = useMemo(() => {
        const lenght = Math.floor(Number(Number(width) > 1260 ? 1260 : width) / 420);

        const chunks: any = [];
        for (let i = 0; i < discoverSteps.length; i += lenght) {
            chunks.push(discoverSteps.slice(i, i + lenght));
        };
        return chunks;
    }, [width]);

    return (
        <section className={classes.discoverSection}>
            <Container>
                <h2 className={classes.title}> Discover How It Works </h2>
                <div className={classes.row} />
                <div className={classes.wrapperStepCards}>
                    { spletedDiscoverSteps.map((discoverStepLine, index) => (
                        <div className={classes.discoverStepLine} key={index}>
                            { discoverStepLine.map((step, index) => (
                                <DiscoverStep
                                    {...step}
                                    key={step.step}
                                    isArrow={Boolean(index !== discoverStepLine.length - 1)}
                                />   
                            ))}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export { DiscoverSection };