/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useToggle } from './Toggle';
import { SerializedStyles } from '@emotion/react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    onButtonClick?: (value: boolean) => void;
    defaultStyle?: SerializedStyles;
};
const Button: React.FC<ButtonProps> = ({ children, onButtonClick, defaultStyle }) => {
    const { toggleValue, changeToggle } = useToggle();

    const handleButtonClick = (value: boolean) => {
        onButtonClick && onButtonClick(value);
        changeToggle();
    };

    useEffect(() => {
        console.log('toggleValue:', toggleValue);
    }, [toggleValue]);

    return (
        <button css={[defaultStyle]} onClick={() => handleButtonClick(toggleValue)}>
            {toggleValue ? 'ON' : 'OFF'}
        </button>
    );
};
export default Button;
