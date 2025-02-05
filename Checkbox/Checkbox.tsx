import React, { createContext, useContext, useState } from 'react';
import Item from './Item';
import AllCheck from './AllCheck';

type CheckboxContextType = {
    checkboxValue: string[];
    changeCheckboxValue: (value: string[]) => void;
};

const CheckboxContext = createContext<CheckboxContextType>({
    checkboxValue: [],
    changeCheckboxValue: ([]) => {},
});

type CheckboxProps = {
    children: React.ReactNode;
};

const Checkbox = ({ children }: CheckboxProps) => {
    const [checkboxValue, setCheckboxValue] = useState<string[]>([]);

    const changeCheckboxValue = (value: string[]) => {
        setCheckboxValue(value);
    };

    return (
        <CheckboxContext.Provider value={{ checkboxValue, changeCheckboxValue }}>{children}</CheckboxContext.Provider>
    );
};
export const useCheckbox = () => {
    return useContext(CheckboxContext);
};

export default Checkbox;

Checkbox.Item = Item;
Checkbox.AllCheck = AllCheck;
