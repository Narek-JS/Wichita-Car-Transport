import { ArrowDynamic } from '@/public/assets/svgs/ArrowDynamic';
import { useState, useEffect, useRef } from 'react';
import { MenuItem } from '@/model/menu';
import Link from 'next/link';
import classNames from 'classnames';
import classes from './index.module.css';

export type DropdownItems = Array<{
  link: string;
  label: string;
  children?: Array<MenuItem>
}>;

interface Iprops {
  label: string;
  items: DropdownItems;
  colorWhite?: boolean;
  isNested?: boolean;
};

const Dropdown: React.FC<Iprops> = ({
  label,
  items,
  colorWhite,
  isNested
}) => {
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
    <div
      className={classNames(classes.dropdown, {
        [classes.isNested]: isNested
      })}
      ref={dropdownRef}
    >
      <button onClick={toggleDropdown} className={classNames(classes.dropdownBtn, { [classes.colorWhite]: colorWhite })}>
        {label}
        <ArrowDynamic
          {...(isOpen && { rotate: 180 })}
          {...(colorWhite && { color: '#005379' })}
        />
      </button>
      {isOpen && (
        <ul className={classes.dropdownMenu}>
          {items.map((item, index) => {
            return (
              !item.children?.isEmpty() ? (
                <Dropdown
                  key={index}
                  isNested={true}
                  label={item.label}
                  items={item.children!.map(({ url, title, children }) => ({
                    link: url!,
                    label: title!,
                    ...(!item.children?.isEmpty() && { children })
                  }))}                
                />
              ) : (
                <li key={index} className={classes.dropdownMenuItem}>
                  <Link href={'/'+item.link} onClick={toggleDropdown}>
                    {item.label}
                  </Link>
                </li>
              ) 
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
