import { CarService } from '@/components/CarService';
import { Container } from '@/components/ui/container';
import { useGetTransportServicesApiQuery } from '@/store/transportServices';
import classes from './index.module.css';

const CarMovingServices = () => {
    const { data } = useGetTransportServicesApiQuery('transport-services');

    return (
        <section className={classes.carMovingsSection}>
            <Container>
                <h2 className={classes.subTitle}>{data?.title}</h2>
                <div className={classes.services}>
                    { data?.carServices.map((service, index) => (
                        <CarService key={index} {...service}/>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export { CarMovingServices };