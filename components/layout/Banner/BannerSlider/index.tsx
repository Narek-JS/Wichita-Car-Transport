import { selectBanner, setCarouselActiveIndex, slelectCarouselActiveIndex } from '@/store/banner';
import { Carousel } from 'react-responsive-carousel';
import { useAppSelector } from '@/store/hooks';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';

import Image from 'next/image';
import classes from './index.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classNames from 'classnames';

interface IProps {
  bannerContentElm: HTMLDivElement | null;
};

interface ICarouselImage {
  height: string;
  imagePath: string
};

const CarouselImageNode: React.FC<ICarouselImage> = ({ height, imagePath }) => {
  const [ isLoad, setIsLoad ] = useState(false);

  const onLoad  = () => {
    setIsLoad(true);
  };

  return (
    <div className={classes.imageWrapper} style={{ height }} >
      <div className={classes.bg} />
      <Image
        src={imagePath}
        alt="Carousel Image"
        layout="fill"
        objectFit="cover"
        onLoad={onLoad}
        className={classNames(classes.bannerImaeg, {
          [classes.loadedBannerImaeg]: isLoad
        })}
      />
      {!isLoad && (
        <Skeleton
          sx={{ bgcolor: 'rgba(0, 83, 121, 0.5)' }}
          variant="rectangular"
          height={'100%'}
        />
      )}
    </div>
  );
};

const BannerSlider: React.FC<IProps> = ({ bannerContentElm }) => {
  const carouselActiveIndex = useAppSelector(slelectCarouselActiveIndex);
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const { data } = useAppSelector(selectBanner);
  const [ height, setHeight ] = useState<string>('100vh');

  useEffect(() => {
    setTimeout(() => {
      handleCarouselChange(0);
    }, 2200);
  }, []);

  useEffect(() => {
    if(bannerContentElm?.offsetHeight) {
      setHeight(bannerContentElm?.offsetHeight + 185 + 'px');
    };
  }, [pathname, bannerContentElm, data]);

  const handleCarouselChange = (index) => {
    dispatch(setCarouselActiveIndex(index));
  };

  return (
    <Carousel
      selectedItem={carouselActiveIndex}
      onChange={handleCarouselChange}
      autoPlay={true}
      infiniteLoop={true}
      interval={300000000}
      showStatus={false}
      showThumbs={false}
      dynamicHeight={true}
    >
      {((data?.bannerImages || []) as any).map((imageNode, index) => (
        <CarouselImageNode
          imagePath={imageNode.path || ''}
          key={imageNode.id || index}
          height={height}
        />
      ))}
    </Carousel>
  );
};

export { BannerSlider };
