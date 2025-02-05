/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
import { useDropdown } from './Dropdown';
import { SerializedStyles } from '@emotion/react';

type ContentProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
};

const Content = ({ children, defaultStyle }: ContentProps) => {
    const { dropdownValue, closeDropdown } = useDropdown();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 외부 클릭 감지 핸들러
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current && // ref가 존재하고
                !containerRef.current.contains(event.target as Node) // 클릭 대상이 내부 엘리먼트가 아니라면
            ) {
                closeDropdown();
            }
        };

        // 드랍다운이 열려 있을 때만 이벤트 리스너 등록
        if (dropdownValue) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // 컴포넌트 언마운트 또는 dropdownValue 변경 시 클린업
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownValue, closeDropdown]);

    return (
        <>
            {dropdownValue && (
                <div ref={containerRef} css={[defaultStyle]}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Content;
