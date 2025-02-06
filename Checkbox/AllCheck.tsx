/** @jsxImportSource @emotion/react */
import React from 'react';
import { useCheckbox } from './Checkbox';
import { css } from '@emotion/react';

const AllCheckStyle = css`
    display: inline-block;
`;

type AllCheckProps = {
    allValues: string[];
    children: React.ReactNode;
};

const AllCheck = ({ allValues, children }: AllCheckProps) => {
    const { checkboxValue, handleCheckboxValue } = useCheckbox();

    const isChecked = (value: string) => checkboxValue.includes(value);
    const allChecked = allValues.every(isChecked);

    const handleCheckAll = () => {
        if (allChecked) {
            handleCheckboxValue([]);
        } else {
            handleCheckboxValue(allValues);
        }
    };
    return (
        <div css={[AllCheckStyle]} onClick={handleCheckAll}>
            {children}
        </div>
    );
};

export default AllCheck;
