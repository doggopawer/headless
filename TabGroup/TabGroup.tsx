// TabGroup.js
import React, {createContext, useContext, useState} from "react";
import {SerializedStyles} from "@emotion/react";
import TabGroupItem from "./TabGroupItem";

type TabGroupStyleType = {
    tab?: {
        defaultStyle?: SerializedStyles;
    };
    title?: {
        activeStyle?: SerializedStyles;
        defaultStyle?: SerializedStyles;
    };
};

type TabGroupHandlerType = {
    tab?: {
        onClick?: (value: string) => void;
    };
    title?: {
        onClick?: (value: string) => void;
    };
};

type TabGroupContextType = {
    tabGroupValue: string;
    changeTabGroupValue: (value: string) => void;
    customStyle?: TabGroupStyleType;
    handler?: TabGroupHandlerType;
};

const TabGroupContext = createContext<TabGroupContextType>({
    tabGroupValue: "",
    changeTabGroupValue: () => {},
});

type TabGroupProps = {
    children: React.ReactNode;
    defaultValue: string;
    customStyle?: TabGroupStyleType;
    handler?: TabGroupHandlerType;
};

const TabGroup = ({
    children,
    defaultValue,
    customStyle,
    handler,
}: TabGroupProps) => {
    const [tabGroupValue, setTabGroup] = useState(defaultValue ?? "");

    const changeTabGroupValue = (value: string) => {
        setTabGroup(value);
    };

    return (
        <TabGroupContext.Provider
            value={{tabGroupValue, changeTabGroupValue, customStyle, handler}}
        >
            {children}
        </TabGroupContext.Provider>
    );
};

export const useTabGroup = () => {
    return useContext(TabGroupContext);
};

export default TabGroup;

TabGroup.Item = TabGroupItem;
