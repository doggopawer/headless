/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useTab } from './Tab';
import { SerializedStyles } from '@emotion/react';

type TitleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    children: React.ReactNode;
    onTitleClick?: (value: string) => void;
    defaultStyle?: SerializedStyles; // css를 선택적 속성으로 설정
    activeStyle?: SerializedStyles;
};

const Title = ({ value, children, onTitleClick, defaultStyle, activeStyle, ...props }: TitleProps) => {
    const { tab, changeTab, customStyle, handler } = useTab();

    const handleChangeTab = (value: string) => {
        changeTab(value);

        if (onTitleClick) {
            onTitleClick(value);
            return;
        }
        if (handler?.title?.onClick) {
            handler.title.onClick(value);
            return;
        }
    };

    useEffect(() => {
        console.log('현재 값', tab);
    }, [tab]);

    return (
        <button
            css={[
                customStyle?.title?.defaultStyle,
                tab === value && customStyle?.title?.activeStyle,
                defaultStyle,
                tab === value && activeStyle,
            ]} // Emotion의 css 배열 사용
            onClick={() => handleChangeTab(value)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Title;
