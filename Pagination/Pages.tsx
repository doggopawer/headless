/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import React from 'react';
import { usePagination } from './Pagination';

type PagesProps = {
    defaultStyle?: SerializedStyles;
    onPagesClick?: (pageValue: number) => void;
};

const Pages = ({ defaultStyle, onPagesClick }: PagesProps) => {
    const { paginationValue, goToPage, endPage, startPage } = usePagination();
    const { page } = paginationValue;

    const handlePagesClick = (pageValue: number) => {
        const newPageValue = goToPage(pageValue);
        onPagesClick && onPagesClick(newPageValue); // onPagesClick 이���트를 호출
    };

    return (
        <>
            {/* startPage부터 endPage까지 페이지 번호 버튼 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const currentPage = startPage + index;
                return (
                    <button
                        key={currentPage}
                        onClick={() => handlePagesClick(currentPage)}
                        disabled={currentPage === page} // 현재 페이지 버튼은 비활성화(혹은 강조)
                        css={[defaultStyle]}
                    >
                        {currentPage} {/* 사용자에게는 1부터 시작하는 숫자로 표시 */}
                    </button>
                );
            })}
        </>
    );
};

export default Pages;
