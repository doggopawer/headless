/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelect } from './Select';
import { SerializedStyles } from '@emotion/react';

type HeadProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    defaultStyle?: SerializedStyles;
};

const Head = ({ defaultStyle }: HeadProps) => {
    const { selectValue } = useSelect();

    return <div css={[defaultStyle]}>{selectValue}</div>;
};

export default Head;
