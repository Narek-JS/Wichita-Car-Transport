import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import classes from './index.module.css';

interface IProps {
  bannerContentElm: HTMLDivElement | null; 
}

const BannerSlider: React.FC<IProps> = ({ bannerContentElm }) => {

  const style = { height: bannerContentElm?.offsetHeight === undefined ? '100vh' : (bannerContentElm?.offsetHeight + 185) + 'px' };

  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={300000000} showStatus={false} showThumbs={false} dynamicHeight={true} >
        <div className={classes.imageWrapper} style={style}>
          <Image src="/assets/images/bannerImage1.png" alt="Image 1" layout="fill" objectFit="cover" />
        </div>
        <div className={classes.imageWrapper} style={style}>
            <Image src="/assets/images/bannerImage2.png" alt="Image 1" layout="fill" objectFit="cover" />
        </div>
        <div className={classes.imageWrapper} style={style}>
            <Image src="/assets/images/bannerImage1.png" alt="Image 1" layout="fill" objectFit="cover" />
        </div>
        <div className={classes.imageWrapper} style={style}>
            <Image src="/assets/images/bannerImage2.png" alt="Image 1" layout="fill" objectFit="cover" />
        </div>
    </Carousel>
  );
};

export { BannerSlider };
