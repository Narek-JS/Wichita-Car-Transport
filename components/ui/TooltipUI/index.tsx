import React, { useState } from "react";
import classNames from "classnames";
import classes from './index.module.css';

interface Props {
  children: React.ReactNode;
  content: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  color?: string;
};

const TooltipUI: React.FC<Props> = ({
  children,
  content,
  color,
  direction = "top", 
  delay = 100
}) => {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => setActive(true), delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
        className={classes['Tooltip-Wrapper']}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
    >
      {children}
      { active && (
          <div
            style={{ ...(color && { backgroundColor: color, color: "#FFFFFF" }) }}
            className={classNames(
              { [classes.getQuote]: color },
              classes['Tooltip-Tip'],
              classes[direction],
            )}
          >
            {content}
          </div>
      )}
    </div>
  );
};

export { TooltipUI };
