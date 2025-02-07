/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTooltip } from './Tooltip';
import { css, SerializedStyles } from '@emotion/react';

type ContentProps = {
    children: React.ReactNode;
    defaultStyle: SerializedStyles;
};

const Content = ({ children, defaultStyle }: ContentProps) => {
    const { tooltipValue, showTooltip, hideTooltip } = useTooltip();

    const handleContentShowToggle = () => {
        showTooltip();
    };

    const handleContentHideToggle = () => {
        hideTooltip();
    };

    return (
        <>
            {tooltipValue && (
                <div css={[defaultStyle]} onMouseOver={handleContentShowToggle} onMouseOut={handleContentHideToggle}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Content;
