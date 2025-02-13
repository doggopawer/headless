import React, {createContext, useContext, useState} from "react";
import Item from "./CheckboxGroupItem";
import AllCheck from "./AllCheck";

type CheckboxGroupContextType = {
    checkboxGroupValue: string[];
    handleCheckboxGroupValue: (value: string[]) => void;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextType>({
    checkboxGroupValue: [],
    handleCheckboxGroupValue: ([]) => {},
});

type CheckboxGroupProps = {
    children: React.ReactNode;
    defaultValue?: string[];
};

const CheckboxGroup = ({children, defaultValue}: CheckboxGroupProps) => {
    const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>(
        defaultValue ?? [],
    );

    const handleCheckboxGroupValue = (value: string[]) => {
        setCheckboxGroupValue(value);
    };

    return (
        <CheckboxGroupContext.Provider
            value={{checkboxGroupValue, handleCheckboxGroupValue}}
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
CheckboxGroup.AllCheck = AllCheck;
