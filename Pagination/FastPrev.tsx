/** @jsxImportSource @emotion/react */
import { usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type FastPrevProps = {
    defaultStyle?: SerializedStyles;
    onFastPrevClick?: (pageValue: number) => void;
};

const FastPrev = ({ defaultStyle, onFastPrevClick }: FastPrevProps) => {
    const { startPage, goToFastPrevPage } = usePagination();

    const handleFastPrevClick = () => {
        const newPage = goToFastPrevPage();
        onFastPrevClick && onFastPrevClick(newPage);
    };

    return (
        <>
            {/* 시작 페이지가 0보다 크면(즉, 이전에 더 많은 페이지가 있다면) 빠른 이전 버튼 렌더링 */}
            {startPage > 0 && (
                <button css={[defaultStyle]} onClick={handleFastPrevClick} aria-label="빠른 이전 페이지">
                    {'<<'}
                </button>
            )}
        </>
    );
};

export default FastPrev;
