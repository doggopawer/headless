/** @jsxImportSource @emotion/react */
import { PaginationValueType, usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type FastPrevProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
    disabledStyle?: SerializedStyles; // css를 선택적 속성으로 설정
    onFastPrevClick?: (paginationValue: PaginationValueType) => void;
};

const FastPrev = ({ children, defaultStyle, disabledStyle, onFastPrevClick }: FastPrevProps) => {
    const { startPage, goToFastPrevPage } = usePagination();

    const handleFastPrevClick = () => {
        const newPaginationValue = goToFastPrevPage();
        onFastPrevClick && onFastPrevClick(newPaginationValue);
    };

    const hasFastPrevPage = startPage > 1;
    const hasNoFastPrevPage = !hasFastPrevPage;

    return (
        <>
            {/* 시작 페이지가 1보다 크면(즉, 이전에 더 많은 페이지가 있다면) 빠른 이전 버튼 렌더링 */}
            {
                // startPage > 1 &&

                <button
                    disabled={hasNoFastPrevPage}
                    css={[defaultStyle, hasNoFastPrevPage && disabledStyle]}
                    onClick={handleFastPrevClick}
                    aria-label="빠른 이전 페이지"
                >
                    {children}
                </button>
            }
        </>
    );
};

export default FastPrev;
