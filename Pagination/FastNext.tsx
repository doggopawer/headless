/** @jsxImportSource @emotion/react */
import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type FastPrevProps = {
    defaultStyle?: SerializedStyles;
    onFastNextClick?: (paginationValue: PaginationValueType) => void;
};

const FastNext = ({ defaultStyle, onFastNextClick }: FastPrevProps) => {
    const { endPage, totalPage, goToFastNextPage } = usePagination();

    const handleFastNextClick = () => {
        const newPaginationValue = goToFastNextPage();
        onFastNextClick && onFastNextClick(newPaginationValue);
    };

    return (
        <>
            {/* 마지막 페이지가 total보다 작으면(즉, 뒤쪽에 더 많은 페이지가 있다면) 빠른 이후 버튼 렌더링 */}
            {endPage < totalPage && (
                <button css={[defaultStyle]} onClick={handleFastNextClick} aria-label="빠른 이후 페이지">
                    {'>>'}
                </button>
            )}
        </>
    );
};

export default FastNext;
