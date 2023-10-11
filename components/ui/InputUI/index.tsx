import { LabelUI } from '../LabelUI';
import { ChangeEvent } from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import classes from './index.module.css';

interface Iprops {
    name: string;
    placeholder?: string;
    type?: string;
    label?: string;
    labelIcon?: boolean;
    handleChange?: ({ name, value }: {name: string, value: string}) => void;
    value?: string;
    required?: boolean;
    register?: any;
    registerOption?: any;
    error?: string;
    defaultValue?: string;
    classN?: string;
    bg?: string;
    autoComplete?: 'on' | 'off';
    dial_code?: string;
    height?: string;
    width?: string;
};

const InputUI: React.FC<Iprops> = ({
    name,
    type = 'text',
    placeholder,
    labelIcon = false,
    label,
    handleChange,
    value,
    registerOption,
    register,
    error,
    defaultValue,
    classN ='',
    bg,
    autoComplete = 'off',
    dial_code,
    height,
    width
}) => {

    const isPhoneInput = name === 'phone';
    const inputProps = {
        name,
        type,
        placeholder,
        autoComplete,
        style: {
            ...(bg && { backgroundColor: bg }),
            ...(height && { height }),
            ...(width && { width })
        },
        ...(handleChange && {
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleChange({ name, value: event.target.value })
        }),
        ...(defaultValue && { defaultValue }),
        ...(value && { value }),
        ...(registerOption && register && { ...register(name, registerOption) }),
        id: name
    };


    return (
        <div className={classes.inputList} style={inputProps.style}>
            {label && (
                <LabelUI htmlFor={name} toolti={true} text={label} icon={labelIcon}/>
            )}
            {isPhoneInput ? (
                <InputMask
                    className={classNames(classes.input, classes[classN])}
                    mask={`(${dial_code || '+1'}) 999 999 9999`}
                    {...inputProps}>
                </InputMask>
            ) : (
                <input
                    className={classNames(classes.input, classes[classN])}
                    {...inputProps}
                />
            )}
            {error && <span className={classes.error}>{error}</span>}
        </div>
    );
};

export { InputUI };
