/** @jsxImportSource @emotion/react */
import React from "react";
import {useSelectGroup} from "./SelectGroup";
import {SerializedStyles} from "@emotion/react";

type SelectGroupDisplayProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    defaultStyle?: SerializedStyles;
};

const SelectGroupDisplay = ({defaultStyle}: SelectGroupDisplayProps) => {
    const {selectGroupValue} = useSelectGroup();

    return <div css={[defaultStyle]}>{selectGroupValue}</div>;
};

export default SelectGroupDisplay;
