import { Fragment } from 'react';
import { HelpSection } from '@/components/HelpSection';
import { Container } from '@/components/ui/container';
import { useScrollToView } from '@/hooks/useScrollToView';
import { IDynamicPageData } from '@/model/dynamicPage';
import Head from 'next/head';
import classes from './index.module.css';
import Image from 'next/image';


const DynamicRoute: React.FC<IDynamicPageData> = ({
    content,
    pageName,
    title,
}) => {
    const sectionRef = useScrollToView<HTMLDivElement>();

    return (
        <Fragment>
            <Head>
                <title key={1}>{pageName} | Wichita Car Transport CRM Blog</title>,
                <meta key={2}
                    property="og:title"
                    data-hid="og:title"
                    data-n-head="ssr"
                    content={`Wichita Car Transport Website ${pageName}`}
                ></meta>
            </Head>
            <section className={classes.section} ref={sectionRef}>
                <Container>
                    <h1 className={classes.title}>{title}</h1>
                    { content?.map(({ id, subTitle, text, image }) => (
                        <Fragment key={id}>
                            <h2 className={classes.subTitle}>{subTitle}</h2>
                            <div className={classes.rowNode}>
                                <div className={classes.textNode}>
                                    {text && <p dangerouslySetInnerHTML={{ __html: text }}/>}
                                </div>

                                { image && (
                                    <Image
                                        src={image}
                                        alt={`${pageName} Us Image`}
                                        className={classes.image}
                                        width={470}
                                        height={220}
                                    />
                                )}
                            </div>
                        </Fragment>

                    ))}
                </Container>
            </section>
            <HelpSection />
        </Fragment>
    );
};

export { DynamicRoute };
