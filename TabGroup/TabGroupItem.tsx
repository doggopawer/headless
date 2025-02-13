/** @jsxImportSource @emotion/react */
import React, {useEffect} from "react";
import {useTabGroup} from "./TabGroup";
import {SerializedStyles} from "@emotion/react";

type TabGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    children: React.ReactNode;
    onTabGroupItemClick?: (value: string) => void;
    defaultStyle?: SerializedStyles; // css를 선택적 속성으로 설정
    activeStyle?: SerializedStyles;
};

const TabGroupItem = ({
    value,
    children,
    onTabGroupItemClick,
    defaultStyle,
    activeStyle,
    ...props
}: TabGroupItemProps) => {
    const {tabGroupValue, changeTabGroupValue, customStyle, handler} =
        useTabGroup();

    const handleChangeTab = (value: string) => {
        changeTabGroupValue(value);

        if (onTabGroupItemClick) {
            onTabGroupItemClick(value);
            return;
        }
        if (handler?.title?.onClick) {
            handler.title.onClick(value);
            return;
        }
    };

    useEffect(() => {
        console.log("현재 값", tabGroupValue);
    }, [tabGroupValue]);

    return (
        <button
            css={[
                customStyle?.title?.defaultStyle,
                tabGroupValue === value && customStyle?.title?.activeStyle,
                defaultStyle,
                tabGroupValue === value && activeStyle,
            ]} // Emotion의 css 배열 사용
            onClick={() => handleChangeTab(value)}
            {...props}
        >
            {children}
        </button>
    );
};

export default TabGroupItem;
