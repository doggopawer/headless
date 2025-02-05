import React, { useEffect } from 'react';
import { useCheckbox } from './Checkbox';

type ItemProps = {
    itemValue: string;
    children: React.ReactNode;
};

const Item = ({ itemValue, children }: ItemProps) => {
    const { checkboxValue, changeCheckboxValue } = useCheckbox();

    const isChecked = checkboxValue.includes(itemValue);

    const filterCheckbox = () => {
        if (isChecked) {
            changeCheckboxValue(checkboxValue.filter((item) => item !== itemValue));
        } else {
            changeCheckboxValue([...checkboxValue, itemValue]);
        }
    };
    useEffect(() => {
        console.log('checkboxValue', checkboxValue);
    }, [checkboxValue]);
  
    return (
        <label>
            <input type="checkbox" checked={isChecked} onClick={filterCheckbox} />
            {children}
        </label>
    );
};

export default Item;
