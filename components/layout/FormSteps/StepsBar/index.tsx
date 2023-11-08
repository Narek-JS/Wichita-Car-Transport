import { selectQuoteFormMobileStatus } from '@/store/quoteForm';
import { useAppSelector } from '@/store/hooks';
import { selectBanner } from '@/store/banner';
import { useMemo } from 'react';
import classNames from 'classnames';
import useWindowSize from '@/hooks/useWindowSize';
import classes from './index.module.css';
import { LocationIcon } from '@/public/assets/svgs/locationIcon';
import { OptionsIcon } from '@/public/assets/svgs/OptionsIcon';
import { ConfirmationStepIcon } from '@/public/assets/svgs/ConfirmationStepIcon';
import { QuoteStepIcon } from '@/public/assets/svgs/QuoteStepIcon';

type ActiveStep = 1 | 2 | 3 | 4;

interface IProps {
    activeStep: ActiveStep;
    setInputBorderAnime: (to: 'back' | 'continue') => void;
};

interface IContentsStepsBar {
    id: ActiveStep;
    text: string;
    IconComponentIndex: number;
};

const StepsBar: React.FC<IProps> = ({ activeStep, setInputBorderAnime }) => {
    const isOpen = useAppSelector(selectQuoteFormMobileStatus);
    const { data } = useAppSelector(selectBanner);
    const { width } = useWindowSize();

    const contentsStepsBar: Array<IContentsStepsBar> = useMemo(() => {
        if(Number(width) <= 768 && data?.stepsBar) {
            const activeStapIndex = data?.stepsBar.findIndex(item => item.id === activeStep)
            const length = activeStapIndex < data?.stepsBar.length ? data?.stepsBar.length : activeStapIndex + 2;
            return data?.stepsBar.slice(activeStapIndex === 3 ? 2 : activeStapIndex, length);
        };
        return data?.stepsBar || [];
    }, [isOpen, activeStep, width, data]);

    const Icons = [
        LocationIcon,
        OptionsIcon,
        ConfirmationStepIcon,
        QuoteStepIcon,
    ];

    return (
        <div className={classNames(classes.stepsBar, {
            [classes.quoteForm]: isOpen
        })}>
            { contentsStepsBar.map(({ id, IconComponentIndex, text }, index) => {
                const IconComponent: React.FC<{ color?: string }> = Icons[IconComponentIndex];
                return (
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
                );
            })}
        </div>
    );
};

export { StepsBar };