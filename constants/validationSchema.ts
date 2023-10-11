import * as yup from "yup";

export const validationSchemaQuoteForm = yup.object({
    from: yup.string().required(),
    to: yup.string().required(),
    vehicle: yup.array().of(
        yup.object({
            year: yup
                .number()
                .typeError('Year must be a number')
                .integer('Year must be an integer')
                .min(2000, 'must be least 2000')
                .max(new Date().getFullYear(), 'Year cannot exceed the current year')
                .required('Year is required'),
            make: yup.string().required('Make is required'),
            model: yup.string().required('Model is required'),
        })
    ),
    time: yup.string().required('Time is required'),
    shippingMethod: yup.string().required('Shipping Method is required'),
    isOperable: yup.string().required('Operable field is required'),
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required().email()
});

export const validationSchemaFormFromTo = yup.object({
    from: yup.string().required(),
    to: yup.string().required(),
});

export const validationSchemaFormVehicles = yup.object({
    vehicle: yup.array().of(
        yup.object({
            year: yup
                .number()
                .typeError('Year must be a number')
                .integer('Year must be an integer')
                .min(2000, 'must be least 2000')
                .max(new Date().getFullYear(), 'Year cannot exceed the current year')
                .required('Year is required'),
            make: yup.string().required('Make is required'),
            model: yup.string().required('Model is required'),
        })
    ),
    time: yup.string().required('Time is required'),
    shippingMethod: yup.string().required('Shipping Method is required'),
    isOperable: yup.string().required('Operable field is required'),
});

export const validationSchemaFormUserInfo = yup.object({
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required().email()
});