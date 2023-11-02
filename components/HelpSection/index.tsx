import { CallIconHelpSection } from '@/public/assets/svgs/CallIconHelpSection';
import { FaqIconHelpSection } from '@/public/assets/svgs/FaqIconHelpSection';
import { LINKS_FROM_MENU_TITLES } from '@/constants/words';
import { useGetHelpsQuery } from '@/store/help';
import { useAppSelector } from '@/store/hooks';
import { LoadingUI } from '../ui/LoadingUI';
import { selectMenus } from '@/store/manu';

import Image from 'next/image';
import Link from 'next/link';
import classes from './index.module.css';

const HelpSection: React.FC = () => {
    const { data: menuData } = useAppSelector(selectMenus);
    const { data, isLoading } = useGetHelpsQuery('help');

    return (
        <section className={classes.helpSection}>
            { isLoading && <LoadingUI type='fullPage' /> }
            <div className={classes.fakyBg} />
            <Image
                src='/assets/images/heplSectionBg.png'
                alt="help background image"
                className={classes.image}
                width={3840}
                height={260}
            />
                <div className={classes.content}>
                    <div className={classes.textes}>
                        {data?.title && 
                            <h3
                                className={classes.title}
                                dangerouslySetInnerHTML={{
                                    __html: data.title
                                        .replace('HELP', '<span>HELP</span>')
                                        .replace('Quote Form', '<span>Quote Form</span>')
                                }}
                            />
                        }
                        { data?.texts.map((text, index) => (
                            <p key={index} className={classes.description}>{text}</p>
                        ))}
                    </div>
                    <div className={classes.links}>
                        <Link href={'tel:' + menuData?.contactInfo?.[LINKS_FROM_MENU_TITLES.phone]?.url || ''}>
                            <CallIconHelpSection />
                            <span>Call Us</span>
                        </Link>
                        <Link href='/faq'>   
                            <FaqIconHelpSection />
                            <span>FAQs</span>
                        </Link>
                    </div>
                </div>
        </section>
    );
};

export { HelpSection };