/** @jsxImportSource @emotion/react */
import React, {useEffect} from "react";
import {useCheckboxGroup} from "./CheckboxGroup";
import {css, SerializedStyles} from "@emotion/react";

type CheckboxGroupItemProps = {
    value: string;
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
};

const CheckboxGroupItem = ({
    value,
    children,
    defaultStyle,
}: CheckboxGroupItemProps) => {
    const {checkboxGroupValue, toggleCheckboxGroupValue} = useCheckboxGroup();

    const handleCheckboxGroupItem = () => {
        toggleCheckboxGroupValue(value);
    };
    useEffect(() => {
        console.log("checkboxValue", checkboxGroupValue);
    }, [checkboxGroupValue]);

    return (
        <div css={[defaultStyle]} onClick={handleCheckboxGroupItem}>
            {children}
        </div>
    );
};

export default CheckboxGroupItem;
