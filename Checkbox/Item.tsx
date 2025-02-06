/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useCheckbox } from './Checkbox';
import { css } from '@emotion/react';

const ItemStyle = css`
    display: inline-block;
`;

type ItemProps = {
    value: string;
    children: React.ReactNode;
};

const Item = ({ value, children }: ItemProps) => {
    const { checkboxValue, handleCheckboxValue } = useCheckbox();

    const isChecked = checkboxValue.includes(value);

    const handleItem = () => {
        if (isChecked) {
            handleCheckboxValue(checkboxValue.filter((item) => item !== value));
        } else {
            handleCheckboxValue([...checkboxValue, value]);
        }
    };
    useEffect(() => {
        console.log('checkboxValue', checkboxValue);
    }, [checkboxValue]);

    return (
        <div css={[ItemStyle]} onClick={handleItem}>
            {children}
        </div>
    );
};

export default Item;
