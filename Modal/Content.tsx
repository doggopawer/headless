/** @jsxImportSource @emotion/react */
import React from 'react';
import { useModal } from './Modal';
import { css, SerializedStyles } from '@emotion/react';

const contentStyle = css`
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
`;

type ContentProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles; // css를 선택적 속성으로 설정
};

const Content = ({ children, defaultStyle }: ContentProps) => {
    const { modalValue } = useModal();

    return <>{modalValue && <div css={[contentStyle, defaultStyle]}>{children}</div>}</>;
};

export default Content;
