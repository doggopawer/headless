// SelectGroup.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
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
    const [selectGroupValue, setSelectGroupValue] = useState<SelectGroupValue>(() => defaultValue ?? '');
    const prevDefaultValueRef = useRef<SelectGroupValue>(defaultValue);

    useEffect(() => {
        const hasChanged = !isEqual(prevDefaultValueRef.current, defaultValue);

        if (hasChanged) {
            console.log('기본값이 실제로 변경되었습니다.', defaultValue);
            setSelectGroupValue(defaultValue);
            prevDefaultValueRef.current = defaultValue;
        }
    }, [defaultValue]);

    const changeSelectGroupValue = (value: SelectGroupValue) => {
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
