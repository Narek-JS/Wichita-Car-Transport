export class VahicleNode {
    year: string;
    make: string;
    model: string;

    constructor() {
        this.year = '',
        this.make = '',
        this.model = ''
    };
};

export interface IFromToFormData {
    from: string,
    to: string
};

export const initialValuesFromToForm = {
    from: '',
    to: ''
};

export interface IvehicleData {
    year: string;
    make: string;
    model: string;
};

export type TypeShippingMethod = '' | 'enclosed' | 'open';
export type TypeOperableMethod = '' | 'yes' | 'no';

export interface IVehicleFormData {
    vehicle: Array<IvehicleData>;
    time: string;
    shippingMethod: TypeShippingMethod
    isOperable: TypeOperableMethod
};

export const initialValuesVehicleForm: IVehicleFormData = {
    vehicle: [ new VahicleNode() ],
    time: '',
    shippingMethod: '',
    isOperable: ''
};

export interface IUserInfoFormData {
    name: string;
    phone: string;
    email: string;
};

export const initialValuesUserInfoForm: IUserInfoFormData = {
    name: '',
    email: '',
    phone: ''
};

export interface IFormData {
    from_to: IFromToFormData;
    form_vehicles: IVehicleFormData;
    form_user_info: IUserInfoFormData;
};

export interface IQuoteFormData extends IFromToFormData, IVehicleFormData, IUserInfoFormData {};

export const initialValuesQuoteForm: IQuoteFormData = {
    ...initialValuesFromToForm,
    ...initialValuesVehicleForm,
    ...initialValuesUserInfoForm
};

export type TypeNamesFormData = 'from_to' | 'form_vehicles' | 'form_user_info';
export type TypeFormData = IFromToFormData | IVehicleFormData | IUserInfoFormData;

export type SetStepFunction = React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>;
export type UpdateGeneralFormData = (name: TypeNamesFormData, updatedFormData: TypeFormData) => void;

export interface ISubmitFormData extends IUserInfoFormData, IFromToFormData {
    vehicle: Array<IvehicleData>;
    time: string;
    shipping: TypeShippingMethod
    operable: TypeOperableMethod
};


// form animations
export interface IMentionInitialValues {
    fromLeft?: Record<string, any>;
    toRight?: Record<string, any>;
    fromRight?: Record<string, any>;
    toLeft?: Record<string, any>;
};

export type MentionVariants = 'fromLeft' | 'toRight' | 'fromRight' | 'toLeft';