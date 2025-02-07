/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, SerializedStyles } from '@emotion/react';

const boxStyle = css`
    display: inline-block;
`;

type BoxProps = {
    children: React.ReactNode;
    defaultStyle: SerializedStyles;
};

const Box = ({ children, defaultStyle }: BoxProps) => {
    return <div css={[boxStyle, defaultStyle]}>{children}</div>;
};

export default Box;
