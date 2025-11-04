import React from 'react';
import { useSelectGroup } from './SelectGroup';

export type SelectGroupObject = { label: string; value: string };
export type SelectGroupValue = string | SelectGroupObject;

type SelectGroupItemProps = React.HTMLAttributes<HTMLLIElement> & {
    value: SelectGroupValue;
    onSelectGroupItemClick?: (value: SelectGroupValue) => void;
};

const SelectGroupItem = ({ value, onSelectGroupItemClick, ...props }: SelectGroupItemProps) => {
    const { changeSelectGroupValue } = useSelectGroup();

    const handleSelectGroupItemClick = (value: string | { label: string; value: string }) => {
        onSelectGroupItemClick && onSelectGroupItemClick(value);
        changeSelectGroupValue(value);
    };

    const displayLabel = typeof value === 'string' ? value : value.label;

    return (
        <li {...props} onClick={() => handleSelectGroupItemClick(value)}>
            {props.children || displayLabel}
        </li>
    );
};

export default SelectGroupItem;
