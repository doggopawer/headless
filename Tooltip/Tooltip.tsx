// Tooltip.tsx
import React, { createContext, HTMLAttributes, useContext, useRef, useState } from 'react';
import Trigger from './Trigger';
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
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setTooltipValue(true);
    };

    const hideTooltip = () => {
        if (hideTimeoutRef.current !== null) {
            // 이미 타이머 설정되어 있으면 중복 방지
            return;
        }

        hideTimeoutRef.current = setTimeout(() => {
            setTooltipValue(false);
            hideTimeoutRef.current = null;
        }, 150);
    };

    return (
        <TooltipContext.Provider value={{ tooltipValue, showTooltip, hideTooltip }}>
            {/* 
        여기 div가 Trigger + Content 전체를 감싸는 hover 영역이 됩니다.
        onMouseEnter/Leave를 이 div에만 걸면 틈새에도 닫히지 않습니다.
      */}
            <div {...props} className={styles.Tooltip} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
                {children}
            </div>
        </TooltipContext.Provider>
    );
};

export const useTooltip = () => useContext(TooltipContext);

export default Tooltip;

// 이렇게 해야 아래에서 Tooltip.Trigger 와 Tooltip.Content 로 사용 가능
Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
