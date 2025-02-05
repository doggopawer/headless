/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React from 'react';

type VisibleProps = {
    children: React.ReactNode;
    defalutStyle?: SerializedStyles;
};

const Visible = ({ children, defalutStyle }: VisibleProps) => {
    return <div css={[defalutStyle]}>{children}</div>;
};

export default Visible;
