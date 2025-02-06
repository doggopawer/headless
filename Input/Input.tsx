/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import { ChangeEventHandler, useState } from 'react';

type InputProps = {
    defaultStyle?: SerializedStyles;
    defaultValue?: string;
    onFormChange?: (value: string) => void;
};

const Input = ({ defaultValue, defaultStyle, onFormChange }: InputProps) => {
    const [inputValue, setInputValue] = useState(defaultValue ?? '');

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        onFormChange && onFormChange(value);
        setInputValue(value);
    };

    return <input css={[defaultStyle]} onChange={handleInputChange} value={inputValue} />;
};

export default Input;
