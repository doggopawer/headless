import React, { createContext, useContext, useEffect, useState } from 'react';
import Button from './Button';

type ToggleContextType = {
    toggleValue: boolean;
    changeToggle: () => void;
};

const ToggleContext = createContext<ToggleContextType>({
    toggleValue: false,
    changeToggle: () => {},
});

type ToggleProps = {
    children: React.ReactNode;
    defaultValue?: boolean;
};

const Toggle = ({ children, defaultValue }: ToggleProps) => {
    const [toggleValue, setToggleValue] = useState(defaultValue ?? false);

    useEffect(() => {
        setToggleValue(defaultValue ?? false);
    }, [defaultValue]);

    const changeToggle = () => {
        setToggleValue((prev) => !prev);
    };

    return <ToggleContext.Provider value={{ toggleValue, changeToggle }}>{children}</ToggleContext.Provider>;
};

export const useToggle = () => {
    return useContext(ToggleContext);
};

export default Toggle;

Toggle.Button = Button;
