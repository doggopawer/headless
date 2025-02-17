/** @jsxImportSource @emotion/react */
import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type PrevProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
    onPrevClick?: (paginationValue: PaginationValueType) => void;
};

const Prev = ({ children, defaultStyle, onPrevClick }: PrevProps) => {
    const { goToPrevPage, hasPrevPage } = usePagination();

    const handlePrevButtonClick = () => {
        const newPaginationValue = goToPrevPage();
        onPrevClick && onPrevClick(newPaginationValue);
    };

    const hasNoPrevPage = !hasPrevPage;

    return (
        <button disabled={hasNoPrevPage} css={[defaultStyle]} onClick={handlePrevButtonClick}>
            {children}
        </button>
    );
};

export default Prev;
