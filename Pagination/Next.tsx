/** @jsxImportSource @emotion/react */
import React from 'react';
import { usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type NextProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
    onNextClick?: (pageValue: number) => void;
};

const Next = ({ children, defaultStyle, onNextClick }: NextProps) => {
    const { goToNextPage, hasNextPage } = usePagination();

    const handleNextButtonClick = () => {
        const newPageValue = goToNextPage();
        onNextClick && onNextClick(newPageValue);
    };

    const hasNoNextPage = !hasNextPage;

    return (
        <button disabled={hasNoNextPage} css={[defaultStyle]} onClick={handleNextButtonClick}>
            {children}
        </button>
    );
};

export default Next;
