// Trigger.js
import React, { MouseEventHandler } from 'react';
import { useDropdown } from './Dropdown';

export type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const Trigger: React.FC<TriggerProps> = ({ children, ...props }) => {
    const { dropdownValue, toggleDropdown, anchorRef } = useDropdown();

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        props.onClick?.(e);
        toggleDropdown();
    };

    // prevent blur when open
    const handleMouseDownCapture = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (dropdownValue) e.stopPropagation();
    };

    return (
        <button
            {...props}
            ref={anchorRef as React.Ref<HTMLButtonElement>}
            onClick={handleClick}
            onMouseDownCapture={handleMouseDownCapture}
        >
            {children}
        </button>
    );
};

export default Trigger;
