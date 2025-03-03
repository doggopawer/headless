import React, {useEffect} from "react";
import {useCheckboxGroup} from "./CheckboxGroup";

type CheckboxGroupItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    children: React.ReactNode;
    onCheckboxGroupItemClick: (value: string[]) => void;
};

const CheckboxGroupItem = ({
    value,
    children,
    onCheckboxGroupItemClick,
    ...props
}: CheckboxGroupItemProps) => {
    const {checkboxGroupValue, toggleCheckboxGroupValue} = useCheckboxGroup();

    const handleCheckboxGroupItem = () => {
        const newCheckboxGroupValue = toggleCheckboxGroupValue(value);
        onCheckboxGroupItemClick(newCheckboxGroupValue);
    };

    useEffect(() => {
        console.log("checkboxValue", checkboxGroupValue);
    }, [checkboxGroupValue]);

    return (
        <div {...props} onClick={handleCheckboxGroupItem}>
            {children}
        </div>
    );
};

export default CheckboxGroupItem;
