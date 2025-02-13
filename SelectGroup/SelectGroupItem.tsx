/** @jsxImportSource @emotion/react */
import {SerializedStyles} from "@emotion/react";
import React from "react";
import {useSelectGroup} from "./SelectGroup";

type SelectGroupItemProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    value: string;
    onSelectGroupItemClick?: (value: string) => void;
    defaultStyle?: SerializedStyles;
    activeStyle?: SerializedStyles;
};

const SelectGroupItem = ({
    children,
    value,
    onSelectGroupItemClick,
    defaultStyle,
    activeStyle,
}: SelectGroupItemProps) => {
    const {selectGroupValue, changeSelectGroupValue} = useSelectGroup();

    const handleSelectGroupItemClick = (value: string) => {
        onSelectGroupItemClick && onSelectGroupItemClick(value);
        changeSelectGroupValue(value);
    };

    return (
        <li
            css={[defaultStyle, selectGroupValue === value && activeStyle]}
            onClick={() => handleSelectGroupItemClick(value)}
        >
            {children}
        </li>
    );
};

export default SelectGroupItem;
