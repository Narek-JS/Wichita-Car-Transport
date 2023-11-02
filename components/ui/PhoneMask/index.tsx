import { IMaskInput } from "react-imask";
import { forwardRef } from "react";

export const PhoneMaskCustom = forwardRef(function TextMaskCustom(props: any, ref) {
    const {onChange, ...other} = props as any;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                "#": /[1-9]/
            }}
            onChange={onChange}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
        />
    );
});