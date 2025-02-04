// Tab.js
import React, { createContext, useContext, useState } from 'react';
import Title from './Title';
import { SerializedStyles } from '@emotion/react';

type TabStyleType = {
    tab?: {
        defaultStyle?: SerializedStyles;
    };
    title?: {
        activeStyle?: SerializedStyles;
        defaultStyle?: SerializedStyles;
    };
};

type TabHandlerType = {
    tab?: {
        onClick?: (value: string) => void;
    };
    title?: {
        onClick?: (value: string) => void;
    };
};

type TabContextType = {
    tab: string;
    changeTab: (value: string) => void;
    customStyle?: TabStyleType;
    handler?: TabHandlerType;
};

const TabContext = createContext<TabContextType>({
    tab: '',
    changeTab: () => {},
});

type TabProps = {
    children: React.ReactNode;
    defaultValue: string;
    customStyle?: TabStyleType;
    handler?: TabHandlerType;
};

const Tab = ({ children, defaultValue, customStyle, handler }: TabProps) => {
    const [tab, setTab] = useState(defaultValue ?? '');

    const changeTab = (value: string) => {
        setTab(value);
    };

    return <TabContext.Provider value={{ tab, changeTab, customStyle, handler }}>{children}</TabContext.Provider>;
};

export const useTab = () => {
    return useContext(TabContext);
};

export default Tab;

Tab.Title = Title;
