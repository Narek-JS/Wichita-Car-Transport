import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { CloseIcon } from '@/public/assets/svgs/CloseIcon';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Portal: React.FC<Props> = ({ children, onClose }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portalRoot = document.createElement('div');
    document.body.appendChild(portalRoot);
    setPortalRoot(portalRoot);

    return () => {
      document.body.removeChild(portalRoot);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const portal = document.querySelector(`.${styles.portal}`) as HTMLElement;
    if (portal && !portal.contains(target)) {
      onClose();
    }
  };    

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [portalRoot, onClose]);

  return portalRoot ? (
    <div className={styles.overlay}>
      <div className={styles.portal}>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseIcon color='#FFFFFF' />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Portal;
