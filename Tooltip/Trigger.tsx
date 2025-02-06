/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useTooltip } from './Tooltip';
import { SerializedStyles } from '@emotion/react';

type TriggerProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
};

const Trigger = ({ children, defaultStyle }: TriggerProps) => {
    const { tooltipValue, showTooltip, hideTooltip } = useTooltip();

    const handleContentShowToggle = () => {
        showTooltip();
    };

    const handleContentHideToggle = () => {
        hideTooltip();
    };

    useEffect(() => {
        console.log('tooltipValue:', tooltipValue);
    }, [tooltipValue]);

    return (
        <div css={[defaultStyle]} onMouseOver={handleContentShowToggle} onMouseOut={handleContentHideToggle}>
            {children}
        </div>
    );
};

export default Trigger;
