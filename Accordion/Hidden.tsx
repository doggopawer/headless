/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React from 'react';
import { useAccordion } from './Accordion';

type HiddenProps = {
    children: React.ReactNode;
    defalutStyle?: SerializedStyles;
};

const Hidden = ({ children, defalutStyle }: HiddenProps) => {
    const { accordionValue } = useAccordion();
    return <>{accordionValue && <div css={[defalutStyle]}>{children}</div>}</>;
};

export default Hidden;
