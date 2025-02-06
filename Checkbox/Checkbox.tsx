import React, { createContext, useContext, useState } from 'react';
import Item from './Item';
import AllCheck from './AllCheck';

type CheckboxContextType = {
    checkboxValue: string[];
    handleCheckboxValue: (value: string[]) => void;
};

const CheckboxContext = createContext<CheckboxContextType>({
    checkboxValue: [],
    handleCheckboxValue: ([]) => {},
});

type CheckboxProps = {
    children: React.ReactNode;
    defaultValue?: string[];
};

const Checkbox = ({ children, defaultValue }: CheckboxProps) => {
    const [checkboxValue, setCheckboxValue] = useState<string[]>(defaultValue ?? []);

    const handleCheckboxValue = (value: string[]) => {
        setCheckboxValue(value);
    };

    return (
        <CheckboxContext.Provider value={{ checkboxValue, handleCheckboxValue }}>{children}</CheckboxContext.Provider>
    );
};
export const useCheckbox = () => {
    return useContext(CheckboxContext);
};

export default Checkbox;

Checkbox.Item = Item;
Checkbox.AllCheck = AllCheck;
