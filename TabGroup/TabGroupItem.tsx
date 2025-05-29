// TabGroupItem.tsx
import React, { useEffect } from 'react';
import { useTabGroup, TabValue } from './TabGroup';

// HTML 버튼의 기본 `value` 타입을 제거(Omit)하고, our 탭 값 타입을 재선언
type TabGroupItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
    value: TabValue;
    children?: React.ReactNode;
    onTabGroupItemClick?: (value: TabValue) => void;
};

const TabGroupItem: React.FC<TabGroupItemProps> = ({ value, children, onTabGroupItemClick, ...props }) => {
    const { tabGroupValue, changeTabGroupValue, isActiveTab } = useTabGroup();

    const handleChangeTab = () => {
        changeTabGroupValue(value);
        onTabGroupItemClick?.(value);
    };

    useEffect(() => {
        // console.log('현재 값', tabGroupValue);
    }, [tabGroupValue]);

    return (
        <button {...props} onClick={handleChangeTab} aria-pressed={isActiveTab(value)}>
            {children}
        </button>
    );
};

export default TabGroupItem;
