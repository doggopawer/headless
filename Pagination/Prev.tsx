/** @jsxImportSource @emotion/react */
import React from 'react';
import { usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type PrevProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
    onPrevClick?: (pageValue: number) => void;
};

const Prev = ({ children, defaultStyle, onPrevClick }: PrevProps) => {
    const { goToPrevPage, hasPrevPage } = usePagination();

    const handlePrevButtonClick = () => {
        const newPageValue = goToPrevPage();
        onPrevClick && onPrevClick(newPageValue);
    };

    const hasNoPrevPage = !hasPrevPage;

    return (
        <button disabled={hasNoPrevPage} css={[defaultStyle]} onClick={handlePrevButtonClick}>
            {children}
        </button>
    );
};

export default Prev;
