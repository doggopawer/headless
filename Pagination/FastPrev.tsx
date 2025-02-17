/** @jsxImportSource @emotion/react */
import { PaginationValueType, usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type FastPrevProps = {
    defaultStyle?: SerializedStyles;
    onFastPrevClick?: (paginationValue: PaginationValueType) => void;
};

const FastPrev = ({ defaultStyle, onFastPrevClick }: FastPrevProps) => {
    const { startPage, goToFastPrevPage } = usePagination();

    const handleFastPrevClick = () => {
        const newPaginationValue = goToFastPrevPage();
        onFastPrevClick && onFastPrevClick(newPaginationValue);
    };

    return (
        <>
            {/* 시작 페이지가 1보다 크면(즉, 이전에 더 많은 페이지가 있다면) 빠른 이전 버튼 렌더링 */}
            {startPage > 1 && (
                <button css={[defaultStyle]} onClick={handleFastPrevClick} aria-label="빠른 이전 페이지">
                    {'<<'}
                </button>
            )}
        </>
    );
};

export default FastPrev;
