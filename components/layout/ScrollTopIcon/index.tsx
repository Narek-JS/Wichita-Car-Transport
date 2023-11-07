import { useScrollPositionWindow } from '@/hooks/useScrollPositionWindow';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import classes from './index.module.css';

const ScrollTopIcon: React.FC = () => {
    const { pathname } = useRouter();
    const [ to, setTo ] = useState<'top' | 'bottom'>('top');
    const scrollPosition = useScrollPositionWindow();

    useEffect(() => {
        if (scrollPosition >= 300 && to !== 'top') {
            setTo('top');
        } else if (scrollPosition < 300 &&  to !== 'bottom') {
            setTo('bottom');
        };
    }, [scrollPosition]);


    const scrollIntoTop = () => window.scroll({
        top: to === 'top' ? 0 : 9999999999,
        left: 0,
        behavior: 'smooth'
    });

    if(pathname === '/404') return null;

    return (
        <div className={classNames(classes.scrollTopIcon, {
            [classes.toTop]: to === 'top',
            [classes.toBottom]: to === 'bottom',
        })} onClick={scrollIntoTop}>
            <span>🡩</span>
        </div>
    );
};

export { ScrollTopIcon };