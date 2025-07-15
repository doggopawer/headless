import React, { createContext, HTMLAttributes, ReactNode, useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Tooltip.module.scss';
import Trigger from './Trigger';
import Content from './Content';

type TooltipContextType = {
    tooltipValue: boolean;
    showTooltip: () => void;
    hideTooltip: () => void;
    anchorRef: React.RefObject<HTMLDivElement | null>;
};

const TooltipContext = createContext<TooltipContextType | null>(null);
export const useTooltip = (): TooltipContextType => {
    const ctx = useContext(TooltipContext);
    if (!ctx) throw new Error('Tooltip must be used within <Tooltip>');
    return ctx;
};

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

const Tooltip: React.FC<TooltipProps> & {
    Trigger: typeof Trigger;
    Content: typeof Content;
} = ({ children, className, ...props }) => {
    const [tooltipValue, setTooltipValue] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const showTooltip = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
        setTooltipValue(true);
    };
    const hideTooltip = () => {
        if (hideTimer.current) return;
        hideTimer.current = setTimeout(() => {
            setTooltipValue(false);
            hideTimer.current = null;
        }, 150);
    };

    return (
        <TooltipContext.Provider value={{ tooltipValue, showTooltip, hideTooltip, anchorRef }}>
            <div
                {...props}
                ref={anchorRef}
                className={classNames(styles.Tooltip, className)}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
            >
                {children}
            </div>
        </TooltipContext.Provider>
    );
};

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
export default Tooltip;
