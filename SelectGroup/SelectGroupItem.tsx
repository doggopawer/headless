import React from 'react';
import { useSelectGroup } from './SelectGroup';

export type SelectGroupValue = string | { label: string; value: any };

type SelectGroupItemProps = React.HTMLAttributes<HTMLLIElement> & {
    children: React.ReactNode;
    value: SelectGroupValue;
    onSelectGroupItemClick?: (value: SelectGroupValue) => void;
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
