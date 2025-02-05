/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useCheckbox } from './Checkbox';
import { css } from '@emotion/react';

const ItemStyle = css`
    display: inline-block;
`;

type ItemProps = {
    itemValue: string;
    children: React.ReactNode;
};

const Item = ({ itemValue, children }: ItemProps) => {
    const { checkboxValue, handleCheckboxValue } = useCheckbox();

    const isChecked = checkboxValue.includes(itemValue);

    const handleItem = () => {
        if (isChecked) {
            handleCheckboxValue(checkboxValue.filter((item) => item !== itemValue));
        } else {
            handleCheckboxValue([...checkboxValue, itemValue]);
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
