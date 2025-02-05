/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React from 'react';

type BoxProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
};

const BoxStyle = css`
    position: relative;
    display: inline-block;
`;

const Box = ({ children, defaultStyle }: BoxProps) => {
    return <div css={[BoxStyle, defaultStyle]}>{children}</div>;
};

export default Box;
