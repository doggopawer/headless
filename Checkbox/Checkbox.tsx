import React, { createContext, useContext, useState } from 'react';
import Item from './Item';
import AllCheck from './AllCheck';

type CheckboxContextType = {
    values: string[];
    checkboxValue: string[];
    handleCheckboxValue: (value: string[]) => void;
};

const CheckboxContext = createContext<CheckboxContextType>({
    values: [],
    checkboxValue: [],
    handleCheckboxValue: ([]) => {},
});

type CheckboxProps = {
    children: React.ReactNode;
    defaultValues?: string[];
};

const Checkbox = ({ children, defaultValues }: CheckboxProps) => {
    const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
    const values = defaultValues;

    const handleCheckboxValue = (value: string[]) => {
        setCheckboxValue(value);
    };

    return (
        <CheckboxContext.Provider value={{ values: values ?? [], checkboxValue, handleCheckboxValue }}>
            {children}
        </CheckboxContext.Provider>
    );
};
export const useCheckbox = () => {
    return useContext(CheckboxContext);
};

export default Checkbox;

Checkbox.Item = Item;
Checkbox.AllCheck = AllCheck;
