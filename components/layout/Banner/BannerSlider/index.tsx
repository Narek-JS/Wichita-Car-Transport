import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import classes from './index.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface IProps {
  bannerContentElm: HTMLDivElement | null; 
};

const BannerSlider: React.FC<IProps> = ({ bannerContentElm }) => {

  let height = '100vh';

  if(bannerContentElm?.offsetHeight) {
    height = bannerContentElm?.offsetHeight + 185 + 'px';
  };

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={300000000}
      showStatus={false}
      showThumbs={false}
      dynamicHeight={true}
    >
      <div className={classes.imageWrapper} style={{ height }}>
        <Image src="/assets/images/bannerImage1.png" alt="Image 1" layout="fill" objectFit="cover" />
      </div>
      <div className={classes.imageWrapper} style={{ height }}>
        <Image src="/assets/images/bannerImage1.png" alt="Image 1" layout="fill" objectFit="cover" />
      </div>
      <div className={classes.imageWrapper} style={{ height }}>
        <Image src="/assets/images/bannerImage1.png" alt="Image 1" layout="fill" objectFit="cover" />
      </div>
      <div className={classes.imageWrapper} style={{ height }}>
        <Image src="/assets/images/bannerImage1.png" alt="Image 1" layout="fill" objectFit="cover" />
      </div>
    </Carousel>
  );
};

export { BannerSlider };
