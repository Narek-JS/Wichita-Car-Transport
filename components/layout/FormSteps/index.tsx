import { FormConfirmation } from './FormConfirmation';
import { useCallback, useRef, useState } from 'react';
import { FormVehicles } from './FormVehicles';
import { FormUserInfo } from './FormUserInfo';
import { eventEmitter } from '@/eventEmitter';
import { FormFromTo } from './FormFromTo';
import { StepsBar } from './StepsBar';
import {
    IFormData,
    TypeFormData,
    TypeNamesFormData,
    initialValuesFromToForm,
    initialValuesUserInfoForm,
    initialValuesVehicleForm
} from '@/model/form';
import classes from './index.module.css';

const initialValues = {
    from_to: initialValuesFromToForm,
    form_vehicles: initialValuesVehicleForm,
    form_user_info: initialValuesUserInfoForm
};

const FormSteps: React.FC = () => {
    const [ step, setStep ] = useState<1 | 2 | 3 | 4>(1);
    const [ inputBorderAnime, setInputBorderAnime ] = useState<'' | 'back' | 'continue'>('');

    const wholeFormDataRef = useRef<IFormData>({
        form_user_info: { ...initialValues.form_user_info },
        form_vehicles: { ...initialValues.form_vehicles },
        from_to: { ...initialValues.from_to }
    });

    const updateGeneralFormData = useCallback((name: TypeNamesFormData, updatedFormData: TypeFormData) => {
        wholeFormDataRef.current[name] = updatedFormData as any;
    }, [step]);

    const setInputBorderAnimeDebounce = (to: 'back' | 'continue') => {
        if(inputBorderAnime) return;
        setInputBorderAnime(to);
        setTimeout(() => setInputBorderAnime(''), 1500);
    };

    const handleResetForm = () => {
        wholeFormDataRef.current = {
            form_user_info: { ...initialValues.form_user_info },
            form_vehicles: { ...initialValues.form_vehicles },
            from_to: { ...initialValues.from_to }
        };
        eventEmitter.publish('resetForm', {
            form_user_info: { ...initialValues.form_user_info },
            form_vehicles: { ...initialValues.form_vehicles },
            from_to: { ...initialValues.from_to }
        });
    };

    return (
        <div className={classes.formSteps}>
            <StepsBar
                activeStep={step}
                setInputBorderAnime={setInputBorderAnimeDebounce}
            />
            <div className={classes.content}>
                <div className={classes.textes}>
                    <div className={classes.explore}>
                        <p>
                            <span>Moving </span>Made <span>Easy</span>
                        </p>
                        <p className={classes.fz24}>
                            WICHITA CAR TRANSPORT
                        </p>
                    </div>
                    <div className={classes.seccondLinkTitle}>
                        <p>
                            Open Car Transport and Full Insurance Benefits
                        </p>
                    </div>
                </div>
                <div className={classes.form}>
                    { step === 1 && (
                        <FormFromTo
                            animatedBorder={inputBorderAnime}
                            initialValues={wholeFormDataRef.current.from_to}
                            setStep={setStep}
                            updateGeneralFormData={updateGeneralFormData}
                        />
                    )}
                    { step === 2 && (
                        <FormVehicles
                            animatedBorder={inputBorderAnime}
                            initialValues={wholeFormDataRef.current.form_vehicles}
                            setStep={setStep}
                            updateGeneralFormData={updateGeneralFormData}
                        />
                    )}
                    { step === 3 && (
                        <FormConfirmation
                            animatedBorder={inputBorderAnime}
                            formData={wholeFormDataRef.current}
                            setStep={setStep}
                        />
                    )}
                    { step === 4 && (
                        <FormUserInfo
                            animatedBorder={inputBorderAnime}
                            initialValues={wholeFormDataRef.current.form_user_info}
                            setStep={setStep}
                            formData={wholeFormDataRef.current}
                            handleResetForm={handleResetForm}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export { FormSteps };