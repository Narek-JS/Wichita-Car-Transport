import { IQuoteFormData, TypeOperableMethod, TypeShippingMethod, VahicleNode, initialValuesQuoteForm } from '@/model/form';
import { handleTypeChangePhone, handleTypeChangeYear, hendleTypeRemoveSpace } from '@/helper/strings';
import { RemoveVehiclesIcon } from '@/public/assets/svgs/RemoveVehiclesIcon';
import { validationSchemaQuoteForm } from '@/constants/validationSchema';
import { AddVehiclesIcon } from '@/public/assets/svgs/AddVehiclesIcon';
import { useQuoteFormMutation } from '@/store/quoteForm/mutation';
import { useGetOptionsApiQuery } from '@/store/optionsByZip';
import { closeQuoteFormDesktop } from '@/store/quoteForm';
import { DropdownSelectUI } from '../ui/DropdownSelectUI';
import { Autocomplete, TextField } from '@mui/material';
import { timeOptions } from '@/constants/options';
import { FormikErrors } from '../ui/FormikError';
import { LoadingUI } from '../ui/LoadingUI';
import { useDispatch } from 'react-redux';
import { IMaskInput } from 'react-imask';
import { LabelUI } from '../ui/LabelUI';
import { useFormik } from 'formik';
import classNames from 'classnames';
import classes from './index.module.css';

const FormQuote = () => {
    const dispatch = useDispatch();
    const [ mutate, { isLoading } ] = useQuoteFormMutation();

    const formik = useFormik<IQuoteFormData>({
        initialValues: initialValuesQuoteForm,
        onSubmit: (values, { resetForm }) => {
            const { shippingMethod, isOperable, ...partOfValues } = values;
            if(!isLoading) {
                mutate({
                    ...partOfValues,
                    operable: isOperable,
                    shipping: shippingMethod
                }).then(() => {
                    resetForm();
                    dispatch(closeQuoteFormDesktop());
                });
            };
        },
        validationSchema: validationSchemaQuoteForm,
    });

    const { isLoading: isLoadingFrom, data: fromData } = useGetOptionsApiQuery(formik.values.from, {
        skip: !formik.values.from
    });

    const { isLoading: isLoadingTo, data: toData } = useGetOptionsApiQuery(formik.values.to, {
        skip: !formik.values.to
    });

    const handleSelectTime = (value: string) => {
        formik.setFieldValue("time", value);
    };

    const handleCheckboxChange = (field: 'shippingMethod' | 'isOperable', value: TypeShippingMethod | TypeOperableMethod) => {
        formik.setFieldValue(field, value);
    };

    const addVehicleList = () => {
        formik.setValues(prev => {
            prev.vehicle.push(new VahicleNode());
            return {...prev};
        });
    };

    const removeVehicleList = () => {
        if(formik.values.vehicle.length === 1) return;

        formik.setValues(prev => {
            prev.vehicle.pop();
            return { ...prev };
        });
    };

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <h2 className={classes.fromTitle}>
                Need <span>Good</span> Content
            </h2>
            <div className={classes.fromTo}>
                <div className={classes.inputWrapper}>
                    <LabelUI color="#FFFFFF" text='From' toolti={true} icon={true}/>
                    <Autocomplete
                        className={classNames('autocomplete')}
                        options={formik.values.from === '' ? [] : (fromData?.data || [])}
                        clearOnBlur={false}
                        loading={isLoadingFrom}
                        value={formik.values.from}
                        renderInput={(params) => <TextField
                            onSelect={(event) => {
                                const { value } = event.target as any;
                                formik.setValues({
                                    ...formik.values,
                                    from: value
                                });
                            }}
                            {...params}
                            onInput={(event) => hendleTypeRemoveSpace(event)}
                            placeholder="City,State or ZIP"
                        />}
                    />
                    <FormikErrors {...{ classes, formik, name: 'from' }}/>
                </div>
                <div className={classes.inputWrapper}>
                    <LabelUI color="#FFFFFF" text='To' toolti={true} icon={true}/>

                    <Autocomplete
                        className={classNames('autocomplete')}
                        options={formik.values.to === '' ? [] : (toData?.data || [])}
                        clearOnBlur={false}
                        loading={isLoadingTo}
                        value={formik.values.to}
                        renderInput={(params) => <TextField
                            onSelect={(event) => {
                                const { value } = event.target as any;
                                formik.setValues({
                                    ...formik.values,
                                    to: value
                                });
                            }}
                            {...params}
                            onInput={(event) => hendleTypeRemoveSpace(event)}
                            placeholder="City,State or ZIP"
                        />}
                    />
                    <FormikErrors {...{ classes, formik, name: 'to' }}/>
                </div>
            </div>

            <div className={classes.vehicles}>
                <LabelUI color="#FFFFFF" text='Vehicle' toolti={true} icon={true}/>
                { formik.values.vehicle.map((vehicle, index) => {
                    const errors = formik.errors as any;
                    return (
                        <div key={index} className={classes.vehicleList}>
                            <div className={classes.inputWrapper}>
                                <input
                                    className={classes.input}
                                    autoComplete='off'
                                    placeholder='Year'
                                    onChange={(event) => {
                                        handleTypeChangeYear(event)
                                        formik.handleChange(event);
                                    }}
                                    name={`vehicle[${index}].year`}
                                    value={vehicle.year}
                                />
                                { formik.touched?.vehicle?.[index]?.year &&
                                  errors?.vehicle?.[index]?.year && (
                                    <span className={classes.error}>
                                        {errors.vehicle?.[index]?.year}
                                    </span>
                                )}
                            </div>
                            <div className={classes.inputWrapper}>
                                <input
                                    className={classes.input}
                                    autoComplete='off'
                                    placeholder='Make'
                                    onChange={(event) => {
                                        hendleTypeRemoveSpace(event);
                                        formik.handleChange(event);
                                    }}
                                    name={`vehicle[${index}].make`}
                                    value={vehicle.make}
                                />
                                { formik.touched?.vehicle?.[index]?.make &&
                                  errors?.vehicle?.[index]?.make && (
                                    <span className={classes.error}>
                                        {errors.vehicle?.[index]?.make}
                                    </span>
                                )}
                            </div>
                            <div className={classes.inputWrapper}>
                                <input
                                    className={classes.input}
                                    autoComplete='off'
                                    placeholder='Model'
                                    onChange={(event) => {
                                        hendleTypeRemoveSpace(event);
                                        formik.handleChange(event);
                                    }}
                                    name={`vehicle[${index}].model`}
                                    value={vehicle.model}
                                />
                                { formik.touched?.vehicle?.[index]?.model &&
                                  errors?.vehicle?.[index]?.model && (
                                    <span className={classes.error}>
                                        {errors.vehicle?.[index]?.model}
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={classes.underVehicleLine}>
                <div className={classes.addIcon} onClick={addVehicleList}>
                    <AddVehiclesIcon />
                    <span>Add Multiple Vehicle</span>
                </div>
                <div className={classes.removeIcon} onClick={removeVehicleList}>
                    <RemoveVehiclesIcon />
                    <span>Remove Vehicle</span>
                </div>
            </div>
            <div className={classes.seccondLine}>
                <div className={classes.dropDownWrapper}>
                    <LabelUI color="#FFFFFF" text='Time' toolti={true} icon={true}/>
                    <DropdownSelectUI
                        items={timeOptions}
                        selectedItem={formik.values.time}
                        setSelectedItem={handleSelectTime}
                    />
                    <FormikErrors {...{ classes, formik, name: 'time' }}/>
                </div>
                <div className={classes.shippingMethod}>
                    <LabelUI color="#FFFFFF" text='Shipping Method?' toolti={true} icon={true}/>
                    <div className={classes.wrapperCheckboxes}>
                        <div
                            className={classes.checkBox}
                            onClick={() => handleCheckboxChange('shippingMethod', 'open')}
                        >
                            <input
                                type='checkbox'
                                className={classes.checkboxInput}
                                checked={formik.values.shippingMethod === 'open'}
                                name='shippingMethod'
                            />
                            <label>Open</label>
                        </div>
                        <div
                            className={classes.checkBox}
                            onClick={() => handleCheckboxChange('shippingMethod', 'enclosed')}
                        >
                            <input
                                type='checkbox'
                                className={classes.checkboxInput}
                                checked={formik.values.shippingMethod === 'enclosed'}
                                name='shippingMethod'
                            />
                            <label>Enclosed</label>
                        </div>
                        <FormikErrors {...{ classes, formik, name: 'shippingMethod' }}/>
                    </div>
                </div>
                <div className={classes.operableOrNot}>
                    <LabelUI
                        color="#FFFFFF"
                        text='Is It Operable?'
                        toolti={true}
                        icon={true}
                        tooltiPosition='left'
                    />
                    <div className={classes.wrapperCheckboxes}>
                        <div
                            className={classes.checkBox}
                            onClick={() => handleCheckboxChange('isOperable', 'yes')}
                        >
                            <input
                                type='checkbox'
                                className={classes.checkboxInput}
                                checked={formik.values.isOperable === 'yes'}
                                name='isOperable'
                            />
                            <label>Yes</label>
                        </div>
                        <div
                            className={classes.checkBox}
                            onClick={() => handleCheckboxChange('isOperable', 'no')}
                        >
                            <input
                                type='checkbox'
                                className={classes.checkboxInput}
                                checked={formik.values.isOperable === 'no'}
                                name='isOperable'
                            />
                            <label>No</label>
                        </div>
                        <FormikErrors {...{ classes, formik, name: 'isOperable' }}/>
                    </div>
                </div>
            </div>

            <div className={classes.userInfo}>
                <div className={classes.inputWrapper}>
                    <LabelUI color="#FFFFFF" text='Name' toolti={true} icon={true}/>
                    <input
                        className={classes.input}
                        autoComplete='off'
                        placeholder='Enter full name'
                        onChange={(event) => {
                            hendleTypeRemoveSpace(event);
                            formik.handleChange(event);
                        }}
                        value={formik.values.name}
                        name='name'
                    />
                    <FormikErrors {...{ classes, formik, name: 'name' }}/>
                </div>
                <div className={classes.inputWrapper}>
                    <LabelUI color="#FFFFFF" text='Phone number' toolti={true} icon={true} />

                    <IMaskInput
                        className={classes.input}
                        value={formik.values.phone}
                        placeholder='Enter Phone number'
                        type="tel"
                        mask="(#00) 000-0000"
                        definitions={{"#": /[1-9]/}}
                        name='phone'
                        onChange={(event) => {
                            handleTypeChangePhone(event);
                            formik.handleChange(event);
                        }}
                    />

                    <FormikErrors {...{ classes, formik, name: 'phone' }} />
                </div>
                <div className={classes.inputWrapper}>
                    <LabelUI color="#FFFFFF" text='Email' toolti={true} icon={true}/>
                    <input
                        className={classes.input}
                        autoComplete='off'
                        placeholder='example@domain.com'
                        onChange={(event) => {
                            hendleTypeRemoveSpace(event);
                            formik.handleChange(event);
                        }}
                        value={formik.values.email}
                        name='email'
                    />
                    <FormikErrors {...{ classes, formik, name: 'email' }}/>
                </div>
            </div>
            <button className={classes.btn} type='submit'>
                { isLoading && <LoadingUI type='roundSmall' /> }
                { !isLoading && 'Continue' }
            </button>
        </form>
    );
};

export { FormQuote };