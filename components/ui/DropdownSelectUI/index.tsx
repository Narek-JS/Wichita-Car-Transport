import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowBottmgender } from '@/public/assets/svgs/ArrowBottmgender';
import classNames from 'classnames';
import classes from './index.module.css';

interface IProps {
  name?: string;
  items: Array<string>;
  selectedItem?: string;
  setSelectedItem?: (text: string) => void;
  setFormValue?: any;
  getFormValues?: any;
  registerOption?: any;
  register?: any;
  clearErrors?: any;
}

const DropdownSelectUI: React.FC<IProps> = ({
  name,
  items,
  selectedItem,
  setSelectedItem,
  setFormValue,
  getFormValues,
  registerOption,
  register,
  clearErrors
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = getFormValues && name ? getFormValues(name) : selectedItem;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFormValue && setFormValue(name, '');
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const paintedItems = useMemo(() => {
    if (value === undefined) return items;
    const foundItem = items.find(item => item === value);
    return foundItem ? items : items.filter(item => item.includes(value));
  }, [value]);

  const handleItemClick = (text: string) => {
    setFormValue && setFormValue(name, text);
    setSelectedItem && setSelectedItem(text);
    clearErrors && clearErrors(name);
    toggleDropdown();
  };

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <div onClick={toggleDropdown} className={classes.wrapperDropdownInput}>
        <input
          {...(setSelectedItem && { onChange: () => setSelectedItem('') })}
          {...(register && name && registerOption && { ...register(name, registerOption) })}
          {...(name && { name })}
          value={value || ''}
          className={classes.dropdownInput}
          placeholder="Pick up Date"
          autoComplete="off"
        />
        <span className={classes.wrapperIcon}>
          <ArrowBottmgender rotate={isOpen ? 180 : 0} />
        </span>
      </div>
      {Boolean(isOpen && paintedItems.length) && (
        <ul className={classes.dropdownMenu}>
          {paintedItems.map((text, index) => (
            <li
              key={index}
              className={classes.dropdownMenuItem}
              onClick={() => handleItemClick(text)}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
      {paintedItems.length === 0 && isOpen && (
        <ul className={classes.dropdownMenu}>
          <li className={classNames(classes.dropdownMenuItem, classes.dropdownMenuNoItem)}>
            No options
          </li>
        </ul>
      )}
    </div>
  );
};

export { DropdownSelectUI };