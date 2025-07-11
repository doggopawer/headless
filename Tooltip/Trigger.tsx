import React from 'react';
import { useTooltip } from './Tooltip';

type TriggerProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Trigger: React.FC<TriggerProps> = ({ children, ...props }) => {
    const { showTooltip, hideTooltip } = useTooltip();
    return (
        <div {...props} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
};

export default Trigger;
