// TabGroup.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import TabGroupItem from './TabGroupItem';

// 1) 탭에서 사용할 값 타입 정의 (string 또는 boolean)
export type TabValue = string | boolean;

type TabGroupContextType = {
    tabGroupValue: TabValue;
    changeTabGroupValue: (value: TabValue) => void;
    isActiveTab: (value: TabValue) => boolean;
};

const TabGroupContext = createContext<TabGroupContextType>({
    tabGroupValue: '',
    changeTabGroupValue: () => {},
    isActiveTab: () => false,
});

type TabGroupProps = {
    children: ReactNode;
    defaultValue: TabValue;
};

const TabGroup: React.FC<TabGroupProps> & {
    Item: typeof TabGroupItem;
} = ({ children, defaultValue }) => {
    const [tabGroupValue, setTabGroupValue] = useState<TabValue>(defaultValue);

    // useEffect(() => {
    //     setTabGroupValue(defaultValue);
    // }, [defaultValue]);

    const changeTabGroupValue = (value: TabValue) => {
        setTabGroupValue(value);
    };

    const isActiveTab = (value: TabValue) => {
        return value === tabGroupValue;
    };

    return (
        <TabGroupContext.Provider value={{ tabGroupValue, changeTabGroupValue, isActiveTab }}>
            {children}
        </TabGroupContext.Provider>
    );
};

export const useTabGroup = () => useContext(TabGroupContext);

TabGroup.Item = TabGroupItem;

export default TabGroup;
