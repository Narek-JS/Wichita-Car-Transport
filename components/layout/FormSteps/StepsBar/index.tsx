import { ConfirmationStepIcon } from '@/public/assets/svgs/ConfirmationStepIcon';
import { QuoteStepIcon } from '@/public/assets/svgs/QuoteStepIcon';
import { LocationIcon } from '@/public/assets/svgs/locationIcon';
import { selectQuoteFormMobileStatus } from '@/store/quoteForm';
import { OptionsIcon } from '@/public/assets/svgs/OptionsIcon';
import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import classNames from 'classnames';
import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';

type ActiveStep = 1 | 2 | 3 | 4;

interface IProps {
    activeStep: ActiveStep;
    setInputBorderAnime: (to: 'back' | 'continue') => void;
};

interface IContentsStepsBar {
    id: ActiveStep;
    text: string;
    IconComponent: React.FC<{ color?: string }>;
};

const initialContentsStepsBar: Array<IContentsStepsBar> = [
    { id: 1, text: 'Select a root', IconComponent: LocationIcon },
    { id: 2, text: 'Select an Options', IconComponent: OptionsIcon },
    { id: 3, text: 'Confirmation', IconComponent: ConfirmationStepIcon },
    { id: 4, text: 'Get a Quote', IconComponent: QuoteStepIcon },
];

const StepsBar: React.FC<IProps> = ({ activeStep, setInputBorderAnime }) => {
    const isOpen = useAppSelector(selectQuoteFormMobileStatus);
    const { width } = useWindowSize();

    const contentsStepsBar: Array<IContentsStepsBar> = useMemo(() => {
        if(Number(width) <= 768) {
            const activeStapIndex = initialContentsStepsBar.findIndex(item => item.id === activeStep)
            const length = activeStapIndex < initialContentsStepsBar.length ? initialContentsStepsBar.length : activeStapIndex + 2;
            return initialContentsStepsBar.slice(activeStapIndex === 3 ? 2 : activeStapIndex, length);
        };
        return initialContentsStepsBar;
    }, [isOpen, activeStep, width]);

    return (
        <div className={classNames(classes.stepsBar, {
            [classes.quoteForm]: isOpen
        })}>
            { contentsStepsBar.map(({ id, IconComponent, text }, index) => (
                <div
                    key={id}
                    onClick={() => activeStep !== id && setInputBorderAnime(id > activeStep ? 'continue' : 'back')}
                    className={classNames(classes.step, {
                        [classes.activeStep]: activeStep === id,
                        [classes.firstStep]: index === 0,
                        [classes.lastStep]: index === contentsStepsBar.length - 1,
                    })}
                >
                    <IconComponent
                        {...(activeStep === id && { color: '#FFFFFF' })}
                    />
                    <span>{text}</span>
                </div>
            ))}
        </div>
    );
};

export { StepsBar };