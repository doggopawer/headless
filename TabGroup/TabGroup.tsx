// TabGroup.js
import React, { createContext, useContext, useState } from 'react';
import TabGroupItem from './TabGroupItem';

type TabGroupContextType = {
    tabGroupValue: string;
    changeTabGroupValue: (value: string) => void;
    isActiveTab: (value: any) => boolean;
};

const TabGroupContext = createContext<TabGroupContextType>({
    tabGroupValue: '',
    changeTabGroupValue: () => {},
    isActiveTab: () => false,
});

type TabGroupProps = {
    children: React.ReactNode;
    defaultValue: string;
    isActiveTab?: (value: any) => boolean;
};

const TabGroup = ({ children, defaultValue }: TabGroupProps) => {
    const [tabGroupValue, setTabGroup] = useState(defaultValue ?? '');

    const changeTabGroupValue = (value: string) => {
        setTabGroup(value);
    };

    const isActiveTab = (value: any) => {
        return value === tabGroupValue;
    }


    return (
        <TabGroupContext.Provider value={{ tabGroupValue, changeTabGroupValue, isActiveTab }}>{children}</TabGroupContext.Provider>
    );
};

export const useTabGroup = () => {
    return useContext(TabGroupContext);
};

export default TabGroup;

TabGroup.Item = TabGroupItem;
