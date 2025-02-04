/** @jsxImportSource @emotion/react */
import React from 'react';
import { useModal } from './Modal';
import { SerializedStyles } from '@emotion/react';

type CloseProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles; // css를 선택적 속성으로 설정
};

const Close = ({ children, defaultStyle }: CloseProps) => {
    const { closeModal } = useModal();

    const handleCloseClick = () => {
        closeModal();
    };

    return (
        <div css={[defaultStyle]} onClick={handleCloseClick}>
            {children}
        </div>
    );
};

export default Close;
