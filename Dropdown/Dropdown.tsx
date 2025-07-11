// Dropdown.js
import React, { createContext, useContext, useRef, useState } from 'react';
import Trigger from './Trigger';
import Content from './Content';
import Box from './Box';

type DropdownContextType = {
    dropdownValue: boolean;
    toggleDropdown: () => void;
    openDropdown: () => void;
    closeDropdown: () => void;
    anchorRef: React.RefObject<HTMLElement>; // ← new
};

const DropdownContext = createContext<DropdownContextType>({
    dropdownValue: false,
    toggleDropdown: () => {},
    openDropdown: () => {},
    closeDropdown: () => {},
    anchorRef: { current: null },
});

export const useDropdown = () => useContext(DropdownContext);

const Dropdown: React.FC<{ children: React.ReactNode }> & {
    Trigger: typeof Trigger;
    Content: typeof Content;
    Box: typeof Box;
} = ({ children }) => {
    const [dropdownValue, setDropdownValue] = useState(false);
    const anchorRef = useRef<HTMLElement>(null);

    const toggleDropdown = () => setDropdownValue((v) => !v);
    const openDropdown = () => setDropdownValue(true);
    const closeDropdown = () => setDropdownValue(false);

    return (
        <DropdownContext.Provider value={{ dropdownValue, toggleDropdown, openDropdown, closeDropdown, anchorRef }}>
            {children}
        </DropdownContext.Provider>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Box = Box;

export default Dropdown;
