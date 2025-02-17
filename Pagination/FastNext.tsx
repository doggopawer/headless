/** @jsxImportSource @emotion/react */
import React from 'react';
import { usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type FastPrevProps = {
    defaultStyle?: SerializedStyles;
    onFastNextClick?: (pageValue: number) => void;
};

const FastNext = ({ defaultStyle, onFastNextClick }: FastPrevProps) => {
    const { endPage, paginationValue, goToFastNextPage } = usePagination();

    const handleFastNextClick = () => {
        const newPage = goToFastNextPage();
        onFastNextClick && onFastNextClick(newPage);
    };

    return (
        <>
            {/* 마지막 페이지가 total보다 작으면(즉, 뒤쪽에 더 많은 페이지가 있다면) 빠른 이후 버튼 렌더링 */}
            {endPage < paginationValue.total && (
                <button css={[defaultStyle]} onClick={handleFastNextClick} aria-label="빠른 이후 페이지">
                    {'>>'}
                </button>
            )}
        </>
    );
};

export default FastNext;
