import { useGetTransportServicesApiQuery } from '@/store/transportServices';
import { LoadingUI } from '@/components/ui/LoadingUI';
import { Container } from '@/components/ui/container';
import { CarService } from '@/components/CarService';
import { Redirect } from '@/components/Redirect';

import classes from './index.module.css';

const CarMovingServices = () => {
    const { data, isError, isLoading } = useGetTransportServicesApiQuery('transport-services');

    if(isError) return <Redirect to='/404' />;

    return (
        <section className={classes.carMovingsSection}>
            { isLoading && <LoadingUI type='fullPage' /> }
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