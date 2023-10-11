import { BurgerCloseIcon } from '@/public/assets/svgs/BurgerCloseIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeSidebar, openSidebar, selectSiteBarStatus } from '@/store/siteBar';
import classes from './index.module.css';

const Burger: React.FC = () => {
    const isOpen = useAppSelector(selectSiteBarStatus);
    const dispatch = useAppDispatch();

    const handleCloseSidebar = () => dispatch(closeSidebar());
    const handleOpenSidebar = () => dispatch(openSidebar());

    return isOpen ? (
        <div className={classes.closeIcon} onClick={handleCloseSidebar}>
            <BurgerCloseIcon />
        </div>
    ) : (
        <div className={classes.bugreg} onClick={handleOpenSidebar}>
            <span className={classes.row} />
            <span className={classes.row} />
            <span className={classes.row} />
        </div>
    );
};

export { Burger };