import React from 'react';
import { useSelectGroup } from './SelectGroup';

type SelectGroupDisplayProps = React.HTMLAttributes<HTMLDivElement> & {
    render?: (value: string) => React.ReactNode;
};

const SelectGroupDisplay = ({ render, ...props }: SelectGroupDisplayProps) => {
    const { selectGroupValue } = useSelectGroup();

    const displayValue = typeof selectGroupValue === 'string' ? selectGroupValue : selectGroupValue.label;

    return <div {...props}>{render ? render(selectGroupValue as string) : displayValue}</div>;
};

export default SelectGroupDisplay;
