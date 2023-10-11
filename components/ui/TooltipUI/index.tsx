import React, { useState } from "react";
import classes from './index.module.css';
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  content: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

const TooltipUI: React.FC<Props> = ({ children, content, direction = "top", delay = 100 }) => {
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
          <div className={classNames(classes['Tooltip-Tip'], classes[direction])}>
              {content}
          </div>
      )}
    </div>
  );
};

export { TooltipUI };
