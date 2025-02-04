/** @jsxImportSource @emotion/react */
import React from 'react';
import { useModal } from './Modal';
import { SerializedStyles } from '@emotion/react';

type TriggerProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles; // css를 선택적 속성으로 설정
};

const Trigger = ({ children, defaultStyle }: TriggerProps) => {
    const { openModal } = useModal();

    const handleTriggerClick = () => {
        openModal();
    };

    return (
        <div css={[defaultStyle]} onClick={handleTriggerClick}>
            {children}
        </div>
    );
};

export default Trigger;
