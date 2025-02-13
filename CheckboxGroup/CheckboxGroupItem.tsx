/** @jsxImportSource @emotion/react */
import React, {useEffect} from "react";
import {useCheckboxGroup} from "./CheckboxGroup";
import {css} from "@emotion/react";

const checkboxGroupItemStyle = css`
    display: inline-block;
`;

type CheckboxGroupItemProps = {
    value: string;
    children: React.ReactNode;
};

const CheckboxGroupItem = ({value, children}: CheckboxGroupItemProps) => {
    const {checkboxGroupValue, handleCheckboxGroupValue} = useCheckboxGroup();

    const isChecked = checkboxGroupValue.includes(value);

    const handleCheckboxGroupItem = () => {
        if (isChecked) {
            handleCheckboxGroupValue(
                checkboxGroupValue.filter(item => item !== value),
            );
        } else {
            handleCheckboxGroupValue([...checkboxGroupValue, value]);
        }
    };
    useEffect(() => {
        console.log("checkboxValue", checkboxGroupValue);
    }, [checkboxGroupValue]);

    return (
        <div css={[checkboxGroupItemStyle]} onClick={handleCheckboxGroupItem}>
            {children}
        </div>
    );
};

export default CheckboxGroupItem;
