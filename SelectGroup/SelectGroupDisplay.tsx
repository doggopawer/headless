import React from 'react';
import { useSelectGroup } from './SelectGroup';

type SelectGroupDisplayProps = React.HTMLAttributes<HTMLDivElement>;

const SelectGroupDisplay = (props: SelectGroupDisplayProps) => {
    const { selectGroupValue } = useSelectGroup();

    const displayValue = typeof selectGroupValue === 'string' ? selectGroupValue : selectGroupValue.label;

    return <div {...props}>{displayValue}</div>;
};

export default SelectGroupDisplay;
