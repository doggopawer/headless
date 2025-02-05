/** @jsxImportSource @emotion/react */
import React from 'react'
import { usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type NextProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
    onNextClick?: (value:number) => void;
}

const Next = ({children, defaultStyle, onNextClick}:NextProps) => {
    const {paginationValue, goToNextPage, hasNextPage} = usePagination();

    const handleNextButtonClick = () => {
        onNextClick && onNextClick(paginationValue.page--);
        goToNextPage();
    }

    const hasNoNextPage = !hasNextPage;


  return (
    <button disabled={hasNoNextPage} css={[defaultStyle]} onClick={handleNextButtonClick}>{children}</button>
  )
}

export default Next