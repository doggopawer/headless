/** @jsxImportSource @emotion/react */
import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type NextProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
    onNextClick?: (paginationValue: PaginationValueType) => void;
};

const Next = ({ children, defaultStyle, onNextClick }: NextProps) => {
    const { goToNextPage, hasNextPage } = usePagination();

    const handleNextButtonClick = () => {
        const newPaginationValue = goToNextPage();
        onNextClick && onNextClick(newPaginationValue);
    };

    const hasNoNextPage = !hasNextPage;

    return (
        <button disabled={hasNoNextPage} css={[defaultStyle]} onClick={handleNextButtonClick}>
            {children}
        </button>
    );
};

export default Next;
