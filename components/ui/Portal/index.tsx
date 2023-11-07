import { CloseIcon } from '@/public/assets/svgs/CloseIcon';
import { useState, useEffect, useRef } from 'react';
import { eventEmitter } from '@/eventEmitter';
import classes from './index.module.css';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
};

const Portal: React.FC<Props> = ({ children, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portalRoot = document.createElement('div');
    document.body.appendChild(portalRoot);
    setPortalRoot(portalRoot);

    eventEmitter.subscribe('dropdownStatus', (isOpen) => {
      if(isOpen && contentRef.current) {
        contentRef.current.scrollTo({
          top: 999,
          behavior: 'smooth'
        })
      };
    });

    return () => {
      document.body.removeChild(portalRoot);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const portal = document.querySelector(`.${classes.portal}`) as HTMLElement;

    if ( portal &&
        !portal.contains(target) &&
        !target.className.includes('option') &&
        !target.className.includes('dropdownMenuItem') &&
        !target.className.includes('MuiButtonBase-root') &&
        !target.className.includes('MuiBackdrop-root') &&
        target.tagName !== 'BODY'
    ) { onClose() };
  };    

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [portalRoot, onClose]);

  return portalRoot ? (
    <div className={classes.overlay}>
      <div className={classNames(classes.portal, 'portal')}>
        <div className={classes.closeButton} onClick={onClose}>
          <CloseIcon color='#DDC00C' />
        </div>
        <div className={classes.content} ref={contentRef}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Portal;
