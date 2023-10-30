import { IFormData, IMentionInitialValues, ISubmitFormData, MentionVariants } from "@/model/form";

export const getCuurentFormatData = (data: IFormData): ISubmitFormData => {
    const {
        from_to,
        form_vehicles: { isOperable: operable, shippingMethod: shipping, time, vehicle },
        form_user_info,
    } = data;

    return {
        ...from_to,
        ...form_user_info,
        operable,
        shipping,
        time,
        vehicle,
    }
};

const mentionInitialValues: IMentionInitialValues = {
    fromLeft: { opacity: 0, x: '-20%' },
    toRight: { opacity: 1, x: 0 },
    fromRight: { opacity: 0, x: '100%' },
    toLeft: { opacity: 1, x: 0 }
};

const mentionAnimationValues: IMentionInitialValues = {
    fromLeft: { opacity: 1, x: 0 },
    toRight: { opacity: 0, x: '100%' },
    fromRight: { opacity: 1, x: 0 },
    toLeft: { opacity: 0, x: '-50%' }
};

export const getMentionInitialValues = (variant: MentionVariants): Record<string, any> => {
    return mentionInitialValues[variant] || {};
};

export const getMentionAnimationValues = (variant: MentionVariants): Record<string, any> => {
    return mentionAnimationValues[variant] || {};
};