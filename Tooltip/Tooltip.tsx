import React, { createContext, HTMLAttributes, useContext, useState } from 'react';
import Trigger from './Trigger';
import Box from './Box';
import Content from './Content';
import styles from './Tooltip.module.scss';

type TooltipContextType = {
    tooltipValue: boolean;
    showTooltip: () => void;
    hideTooltip: () => void;
};

const TooltipContext = createContext<TooltipContextType>({
    tooltipValue: false,
    showTooltip: () => {},
    hideTooltip: () => {},
});

type TooltipProps = HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Tooltip = ({ children, ...props }: TooltipProps) => {
    const [tooltipValue, setTooltipValue] = useState(false);

    const showTooltip = () => {
        setTooltipValue(true);
    };

    const hideTooltip = () => {
        setTooltipValue(false);
    };

    return (
        <TooltipContext.Provider value={{ tooltipValue, showTooltip, hideTooltip }}>
            <div {...props} className={styles.Tooltip}>
                {children}
            </div>
        </TooltipContext.Provider>
    );
};

export const useTooltip = () => {
    return useContext(TooltipContext);
};

export default Tooltip;

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
// Tooltip.Box = Box;
