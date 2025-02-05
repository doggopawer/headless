import React from 'react';
import { useCheckbox } from './Checkbox';

type AllCheckProps = {
    allvalues: string[];
    children: React.ReactNode;
};
const AllCheck = ({ allvalues, children }: AllCheckProps) => {
    const { checkboxValue, changeCheckboxValue } = useCheckbox();
    const isChecked = (value: string) => checkboxValue.includes(value);
    const allChecked = allvalues.length > 0 && allvalues.every(isChecked);

    const checkAll = () => {
        if (allChecked) {
            changeCheckboxValue([]);
        } else {
            changeCheckboxValue(allvalues);
        }
    };
    return (
        <label>
            <input type="checkbox" checked={allChecked} onClick={checkAll} />
            {children}
        </label>
    );
};

export default AllCheck;
