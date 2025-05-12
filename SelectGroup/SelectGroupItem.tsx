import React from 'react';
import { useSelectGroup } from './SelectGroup';

type SelectGroupItemProps = React.HTMLAttributes<HTMLLIElement> & {
    children: React.ReactNode;
    value: string | { label: string; value: string };
    onSelectGroupItemClick?: (value: string | { label: string; value: string }) => void;
};

const SelectGroupItem = ({ children, value, onSelectGroupItemClick, ...props }: SelectGroupItemProps) => {
    const { changeSelectGroupValue } = useSelectGroup();

    const handleSelectGroupItemClick = (value: string | { label: string; value: string }) => {
        onSelectGroupItemClick && onSelectGroupItemClick(value);
        changeSelectGroupValue(value);
    };

    return (
        <li {...props} onClick={() => handleSelectGroupItemClick(value)}>
            {children}
        </li>
    );
};

export default SelectGroupItem;
