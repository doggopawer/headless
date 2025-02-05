/** @jsxImportSource @emotion/react */
import React from 'react';
import { useCheckbox } from './Checkbox';
import { css } from '@emotion/react';

const AllCheckStyle = css`
    display: flex;
`;

type AllCheckProps = {
    children: React.ReactNode;
};

const AllCheck = ({ children }: AllCheckProps) => {
    const { checkboxValue, handleCheckboxValue, values } = useCheckbox();
    const isChecked = (value: string) => checkboxValue.includes(value);
    const allChecked = checkboxValue.length > 0 && checkboxValue.every(isChecked);

    const handleCheckAll = () => {
        if (allChecked) {
            handleCheckboxValue([]);
        } else {
            handleCheckboxValue(values);
        }
    };
    return (
        <div css={[AllCheckStyle]} onClick={handleCheckAll}>
            {children}
        </div>
    );
};

export default AllCheck;
