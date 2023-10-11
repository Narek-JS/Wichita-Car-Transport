import { FaqIconHelpSection } from '@/public/assets/svgs/FaqIconHelpSection';
import { CallIconHelpSection } from '@/public/assets/svgs/CallIconHelpSection';
import Image from 'next/image';
import Link from 'next/link';
import classes from './index.module.css';
import useWindowSize from '@/hooks/useWindowSize';

const HelpSection: React.FC = () => {
    const { width } = useWindowSize();

    const descriptionTextes = [
        'With our simple steps, you can get a free car shipping quote at New York City Car Transport!.',
        'With us, your vehicle moving will be the easiest thing to do.',
        'You can get the quote on our website or you can also get a direct quote by calling us and speaking to one of our live agents.',
        'After checking your information, our agents will get back to you with the quoted price.'
    ];

    if(Number(width) <= 991) return null;

    return (
        <section className={classes.helpSection}>
            <div className={classes.fakyBg}/>
            <Image
                src='/assets/images/heplSectionBg.png'
                alt="help background image"
                className={classes.image}
                width={3840}
                height={260}
            />
                <div className={classes.content}>
                    <div className={classes.textes}>
                        <h3 className={classes.title}>
                            If you need an any <span>HELP</span>,  using Our auto transport <span>Quote Form</span> just let us know !
                        </h3>
                        { descriptionTextes.map((text, index) => (
                            <p key={index} className={classes.description}>{text}</p>
                        ))}
                    </div>
                    <div className={classes.links}>
                        <Link href='tel:5464654'>
                            <CallIconHelpSection />
                            <span>Call Us</span>
                        </Link>
                        <Link href='faq'>   
                            <FaqIconHelpSection />
                            <span>FAQs</span>
                        </Link>
                    </div>
                </div>
        </section>
    )
};

export { HelpSection };