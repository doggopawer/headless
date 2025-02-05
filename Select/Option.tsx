/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import React from 'react';
import { useSelect } from './Select';

type OptionProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    value: string;
    onOptionClick?: (value: string) => void;
    defaultStyle?: SerializedStyles;
};

const Option = ({ children, value, onOptionClick, defaultStyle }: OptionProps) => {
    const { changeSelectValue } = useSelect();

    const handleOptionClick = (value: string) => {
        onOptionClick && onOptionClick(value);
        changeSelectValue(value);
    };

    return (
        <li css={[defaultStyle]} onClick={() => handleOptionClick(value)}>
            {children}
        </li>
    );
};

export default Option;
