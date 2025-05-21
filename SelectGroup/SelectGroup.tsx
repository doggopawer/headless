// SelectGroup.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import SelectGroupItem, { SelectGroupValue } from './SelectGroupItem';
import SelectGroupDisplay from './SelectGroupDisplay';

type SelectGroupContextType = {
    selectGroupValue: SelectGroupValue;
    changeSelectGroupValue: (value: SelectGroupValue) => void;
};

const SelectGroupContext = createContext<SelectGroupContextType>({
    selectGroupValue: '',
    changeSelectGroupValue: (value) => {},
});

type SelectGroupProps = {
    children: React.ReactNode;
    defaultValue: SelectGroupValue;
    onFormChange?: (value: SelectGroupValue) => void;
};

const SelectGroup = ({ children, defaultValue, onFormChange }: SelectGroupProps) => {
    const [selectGroupValue, setSelectGroupValue] = useState<string | { label: string; value: string }>(
        defaultValue ?? ''
    );

    // useEffect(() => {
    //     console.log('기본값이 변했습니다.', defaultValue);
    //     setSelectGroupValue(defaultValue);
    // }, [defaultValue]);

    const changeSelectGroupValue = (value: string | { label: string; value: string }) => {
        onFormChange && onFormChange(value);
        setSelectGroupValue(value);
    };

    return (
        <SelectGroupContext.Provider value={{ selectGroupValue, changeSelectGroupValue }}>
            {children}
        </SelectGroupContext.Provider>
    );
};

export const useSelectGroup = () => {
    return useContext(SelectGroupContext);
};

export default SelectGroup;

SelectGroup.Display = SelectGroupDisplay;
SelectGroup.Item = SelectGroupItem;
SelectGroup.changeHandlerPropName = 'onSelectGroupChange';
