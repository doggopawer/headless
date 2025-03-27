import React, { MouseEventHandler } from 'react';
import { useDropdown } from './Dropdown';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const Trigger = ({ children, ...props }: TriggerProps) => {
    const { dropdownValue, toggleDropdown } = useDropdown();

    const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        props.onClick && props.onClick(e);
        toggleDropdown();
    };

    // 이벤트 캡쳐링 방지
    const handleTriggerMouseDownCapture = (event: React.MouseEvent<HTMLButtonElement>) => {
        // event.stopPropagation();
    };

    return (
        <button {...props} onClick={handleTriggerClick} onMouseDownCapture={handleTriggerMouseDownCapture}>
            {children}
        </button>
    );
};

export default Trigger;
