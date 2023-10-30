import * as yup from "yup";

export const validationSchemaQuoteForm = yup.object({
    from: yup.string().min(2).required(),
    to: yup.string().min(2).required(),
    vehicle: yup.array().of(
        yup.object({
            year: yup
                .number()
                .typeError('Year must be a number')
                .integer('Year must be an integer')
                .min(2000, 'must be least 2000')
                .max(new Date().getFullYear(), 'type the current year')
                .required('Year is required'),
            make: yup.string().min(2, 'must be least then 2 character').required('Make is required'),
            model: yup.string().min(2, 'must be least then 2 character').required('Model is required'),
        })
    ),
    time: yup.string().required('Time is required'),
    shippingMethod: yup.string().required("this is required"),
    isOperable: yup.string().required("this is required"),
    name: yup.string().min(2, 'must be least then 2 character').required(),
    phone: yup.string().min(10, "Invalid phone number").required(),
    email: yup.string().required().email()
});

export const validationSchemaFormFromTo = yup.object({
    from: yup.string().min(2).required(),
    to: yup.string().min(2).required(),
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
    shippingMethod: yup.string().required("this is required"),
    isOperable: yup.string().required("this is required"),
});

export const validationSchemaFormUserInfo = yup.object({
    name: yup.string().min(2, 'must be less then 2 character').required(),
    phone: yup.string().min(14, "Invalid phone number").matches(new RegExp('[0-9]')).required(),
    email: yup.string().required().email()
});