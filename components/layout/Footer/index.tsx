import { useAppSelector } from '@/store/hooks';
import { selectMenus } from '@/store/manu';
import { Container } from '@/components/ui/container';
import { EarringIcon } from '@/public/assets/svgs/EarringIcon';
import { MailIcon } from '@/public/assets/svgs/MailIcon';
import { Fragment } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import Image from 'next/image';
import classes from './index.module.css';

const Footer = () => {
    const { data } = useAppSelector(selectMenus);
    const { width } = useWindowSize();

    const splitedNodes = data?.allItems.reduce((acc: any, menuItem: any): any => {
        if(menuItem.children?.isEmpty()) {
            acc[0].push(menuItem)
        } else {
            acc.push([menuItem]);
        };
        return acc;
    }, [[]]) || [];

    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.content}>
                    { Number(width) > 768 && splitedNodes?.reverse().map((group, index) => (
                        <div className={classes.node} key={index}>
                            { group.map((menuItem, menuItemIndex) => menuItem.children?.isEmpty() ? (
                                <Link key={menuItemIndex} href={menuItem.url || ''} className={classes.link}>{menuItem.title}</Link>
                            ) : (
                                <Fragment key={menuItemIndex}>
                                    <h2 className={classes.nodeTitle}>{menuItem.title}</h2>
                                    { menuItem?.children?.map((childItem, index) => (
                                        <Link href={childItem.url || ''} className={classes.link} key={index}>{childItem.title}</Link>
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    ))}
                    <div className={classes.node}>
                        <Link href='/'>
                            <Image
                                src={"/assets/images/LogoWhite.png"} // data?.logo || "/assets/images/logo.png"
                                alt="logo"
                                className={classes.logo}
                                width={190}
                                height={100}
                                priority
                            />
                        </Link>
                        <h2 className={classes.nodeTitle}>Contact Info</h2>
                        { data?.topHeaderLeftItem?.url &&
                            <Link href={`tel:${data?.topHeaderLeftItem?.url}`} className={classes.dynamicLink}>
                                { data?.topHeaderLeftItem?.title === 'phone' ? <EarringIcon /> : <MailIcon /> }
                                { data?.topHeaderLeftItem?.url }
                            </Link>
                        }
                        { data?.topHeaderRightItem?.url &&
                            <Link href={`tel:${data?.topHeaderRightItem?.url}`} className={classes.dynamicLink}>
                                { data?.topHeaderLeftItem?.title === 'Mail' ?  <EarringIcon /> : <MailIcon /> }
                                { data?.topHeaderRightItem?.url }
                            </Link>
                        }
                    </div>
                </div>
                <div className={classes.underNode}>
                    <p>© 2023 - New York City Car Transport. All Rights Reserved.</p>
                    <div className={classes.links}>
                        <span className={classes.row} />
                        <Link href='terms-condition'>Terms of Use</Link>
                        <span className={classes.row} />
                        <Link href='privacy-policy'>Privacy Policy</Link>
                        <span className={classes.row} />
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export { Footer };