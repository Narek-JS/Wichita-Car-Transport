import { Fragment } from 'react';
import { HelpSection } from '@/components/HelpSection';
import { Container } from '@/components/ui/container';
import { useScrollToView } from '@/hooks/useScrollToView';
import { IDynamicContentFromAdmin } from '@/model/dynamicPage';
import Head from 'next/head';
import classes from './index.module.css';


const DynamicContentFromAdmin: React.FC<IDynamicContentFromAdmin> = (props) => {
    const {
        title,
        content
    } = props;
    const sectionRef = useScrollToView<HTMLDivElement>();
    return (
        <Fragment>
            <Head>
                <title key={1}> | Wichita Car Transport CRM Blog</title>,
                <meta key={2}
                    property="og:title"
                    data-hid="og:title"
                    data-n-head="ssr"
                    content={`Wichita Car Transport Website `}
                ></meta>
            </Head>
            <section className={classes.section} ref={sectionRef}>
                <Container>
                    <h1 className={classes.title}>{title}</h1>
                    { content &&
                        <div
                            className={classes.content}
                            dangerouslySetInnerHTML={{__html: content}}
                        />
                    }
                </Container>
            </section>
            <HelpSection />
        </Fragment>
    );
};

export { DynamicContentFromAdmin };