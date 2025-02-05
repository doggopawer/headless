/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
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
    defaultStyle?: SerializedStyles; // 선택적 css 속성
};

const Content = ({ children, defaultStyle }: ContentProps) => {
    const { modalValue, closeModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 외부 클릭 감지 핸들러
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current && // ref가 존재하고
                !containerRef.current.contains(event.target as Node) // 클릭 대상이 모달 내부가 아니라면
            ) {
                closeModal();
            }
        };

        if (modalValue) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalValue, closeModal]);

    return (
        <>
            {modalValue && (
                <div ref={containerRef} css={[contentStyle, defaultStyle]}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Content;
