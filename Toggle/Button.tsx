import React, { useEffect } from 'react';
import { useToggle } from './Toggle';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    onButtonClick?: (value: boolean) => void;
};

const Button: React.FC<ButtonProps> = ({ children, onButtonClick, style, ...props }) => {
    const { toggleValue, changeToggle } = useToggle();

    const handleButtonClick = (value: boolean) => {
        onButtonClick && onButtonClick(changeToggle());
    };

    useEffect(() => {
        // console.log('toggleValue:', toggleValue);
    }, [toggleValue]);

    return (
        <button onClick={() => handleButtonClick(toggleValue)} style={style} {...props}>
            {children}
        </button>
    );
};

export default Button;
