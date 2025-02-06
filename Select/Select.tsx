// Select.js
import React, { createContext, useContext, useState } from 'react';
import Head from './Head';
import Option from './Option';

type SelectContextType = {
    selectValue: string;
    changeSelectValue: (value: string) => void;
};

const SelectContext = createContext<SelectContextType>({
    selectValue: '',
    changeSelectValue: (value) => {},
});

type SelectProps = {
    children: React.ReactNode;
    defaultValue?: string;
};

const Select = ({ children, defaultValue }: SelectProps) => {
    const [selectValue, setSelectValue] = useState(defaultValue ?? '');

    const changeSelectValue = (value: string) => {
        setSelectValue(value);
    };

    return <SelectContext.Provider value={{ selectValue, changeSelectValue }}>{children}</SelectContext.Provider>;
};

export const useSelect = () => {
    return useContext(SelectContext);
};

export default Select;

Select.Head = Head;
Select.Option = Option;
