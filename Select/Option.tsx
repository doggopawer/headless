/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import React from 'react';
import { useSelect } from './Select';

type OptionProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    value: string;
    onOptionClick?: (value: string) => void;
    defaultStyle?: SerializedStyles;
    activeStyle?: SerializedStyles;
};

const Option = ({ children, value, onOptionClick, defaultStyle, activeStyle }: OptionProps) => {
    const { selectValue, changeSelectValue } = useSelect();

    const handleOptionClick = (value: string) => {
        onOptionClick && onOptionClick(value);
        changeSelectValue(value);
    };

    return (
        <li css={[defaultStyle, selectValue === value && activeStyle]} onClick={() => handleOptionClick(value)}>
            {children}
        </li>
    );
};

export default Option;
