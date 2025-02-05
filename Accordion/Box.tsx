/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const BoxStyle = css`
    display: inline-block;
`;

type BoxProps = {
    children: React.ReactNode;
};

const Box = ({ children }: BoxProps) => {
    return <div css={[BoxStyle]}>{children}</div>;
};

export default Box;
