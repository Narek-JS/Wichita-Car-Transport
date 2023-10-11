import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { ArrowIcon } from '@/public/assets/svgs/ArrowIcon';

import classes from './index.module.css';
import classNames from 'classnames';
import { ArrowDynamic } from '@/public/assets/svgs/ArrowDynamic';

export type DropdownItems = Array<{ link: string; label: string }>;

interface Iprops {
  label: string;
  items: DropdownItems;
  colorWhite?: boolean;
};

const Dropdown: React.FC<Iprops> = ({ label, items, colorWhite }) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      };
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    };

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={classNames(classes.dropdownBtn, { [classes.colorWhite]: colorWhite })}>
        {label}
        <ArrowDynamic
          {...(isOpen && { rotate: 180 })}
          {...(colorWhite && { color: '#005379' })}
        />
      </button>
      {isOpen && (
        <ul className={classes.dropdownMenu}>
          {items.map((item, index) => (
            <li key={index} className={classes.dropdownMenuItem}>
              <Link href={'/'+item.link} onClick={toggleDropdown}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
