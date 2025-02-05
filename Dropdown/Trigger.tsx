/** @jsxImportSource @emotion/react */
import React from 'react';
import { useDropdown } from './Dropdown';
import { SerializedStyles } from '@emotion/react';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    onTriggerClick?: () => void;
    defaultStyle?: SerializedStyles; // css를 선택적 속성으로 설정
    activeStyle?: SerializedStyles;
};

const Trigger = ({ children, onTriggerClick, defaultStyle, activeStyle }: TriggerProps) => {
    const { dropdownValue, toggleDropdown } = useDropdown();

    const handleTriggerClick = () => {
        onTriggerClick && onTriggerClick();
        toggleDropdown();
    };
    // 이벤트 캡쳐링 방지
    const handleTriggerMouseDownCapture = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    return (
        <button
            css={[defaultStyle, dropdownValue && activeStyle]}
            onClick={handleTriggerClick}
            onMouseDownCapture={handleTriggerMouseDownCapture}
        >
            {children}
        </button>
    );
};

export default Trigger;
