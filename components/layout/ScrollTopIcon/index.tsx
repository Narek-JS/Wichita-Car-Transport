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
            <span>
                <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.70711 0.292892C8.31658 -0.0976315 7.68342 -0.0976315 7.29289 0.292892L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292892ZM9 18L9 1L7 1L7 18L9 18Z"
                        fill="#005379"
                    />
                </svg>
            </span>
        </div>
    );
};

export { ScrollTopIcon };