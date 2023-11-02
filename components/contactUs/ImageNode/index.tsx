import { LINKS_FROM_MENU_TITLES } from '@/constants/words';
import { useAppSelector } from '@/store/hooks';
import { selectMenus } from '@/store/manu';

import Image from 'next/image';
import Link from 'next/link';
import classes from './index.module.css';

const ImageNode: React.FC = () => {
    const { data } = useAppSelector(selectMenus);

    return (
        <div className={classes.imageNode}>
            <p className={classes.title}><span>Live</span> Agents Available</p>
            <Image
                src={"/assets/images/contactUsImage.png"}
                alt="Live Agents Available"
                className={classes.image}
                width={235}
                height={235}
                priority
            />
            <Link href={data?.contactInfo[LINKS_FROM_MENU_TITLES.phone].url || ''} className={classes.link}>
                Phone: <span>{data?.contactInfo[LINKS_FROM_MENU_TITLES.phone].url}</span>
            </Link>
            <Link href={data?.contactInfo[LINKS_FROM_MENU_TITLES.mail].url || ''} className={classes.link}>
                Email: <span>{data?.contactInfo[LINKS_FROM_MENU_TITLES.mail].url}</span>
            </Link>
        </div>
    );
};

export { ImageNode };