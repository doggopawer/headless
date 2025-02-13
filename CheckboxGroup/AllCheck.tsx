/** @jsxImportSource @emotion/react */
import React from "react";
import {useCheckboxGroup} from "./CheckboxGroup";
import {css} from "@emotion/react";

const AllCheckStyle = css`
    display: inline-block;
`;

type AllCheckProps = {
    allValues: string[];
    children: React.ReactNode;
};

const AllCheck = ({allValues, children}: AllCheckProps) => {
    const {checkboxGroupValue, handleCheckboxGroupValue} = useCheckboxGroup();

    const isChecked = (value: string) => checkboxGroupValue.includes(value);
    const allChecked = allValues.every(isChecked);

    const handleCheckAll = () => {
        if (allChecked) {
            handleCheckboxGroupValue([]);
        } else {
            handleCheckboxGroupValue(allValues);
        }
    };
    return (
        <div css={[AllCheckStyle]} onClick={handleCheckAll}>
            {children}
        </div>
    );
};

export default AllCheck;
