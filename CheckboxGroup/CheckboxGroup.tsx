import React, {createContext, useContext, useEffect, useState} from "react";
import Item from "./CheckboxGroupItem";

type CheckboxGroupContextType = {
    checkboxGroupValue: string[];
    toggleCheckboxGroupValue: (value: string) => string[];
    isChecked: (value: string) => boolean;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextType>({
    checkboxGroupValue: [],
    toggleCheckboxGroupValue: () => [],
    isChecked: () => false,
});

type CheckboxGroupProps = {
    children: React.ReactNode;
    defaultValue?: string[];
};

const CheckboxGroup = ({children, defaultValue}: CheckboxGroupProps) => {
    const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>(
        defaultValue ?? [],
    );

    useEffect(() => {
        setCheckboxGroupValue(defaultValue ?? []);
    }, [defaultValue]);

    const isChecked = (value: string) => checkboxGroupValue.includes(value);

    const toggleCheckboxGroupValue = (value: string) => {
        const newCheckboxGroupValue = checkboxGroupValue.includes(value)
            ? checkboxGroupValue.filter(item => item !== value)
            : [...checkboxGroupValue, value];

        setCheckboxGroupValue(newCheckboxGroupValue);

        return newCheckboxGroupValue;
    };

    return (
        <CheckboxGroupContext.Provider
            value={{checkboxGroupValue, isChecked, toggleCheckboxGroupValue}}
        >
            {children}
        </CheckboxGroupContext.Provider>
    );
};
export const useCheckboxGroup = () => {
    return useContext(CheckboxGroupContext);
};

export default CheckboxGroup;

CheckboxGroup.Item = Item;
