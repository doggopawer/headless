/** @jsxImportSource @emotion/react */
import React from 'react'
import { usePagination } from './Pagination';
import { SerializedStyles } from '@emotion/react';

type PrevProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
    onPrevClick?: (value:number) => void;
}

const Prev = ({children, defaultStyle, onPrevClick}:PrevProps) => {
    const {paginationValue, goToPrevPage, hasPrevPage} = usePagination();

    const handlePrevButtonClick = () => {
        onPrevClick && onPrevClick(paginationValue.page--);
        goToPrevPage();
    }

    const hasNoPrevPage = !hasPrevPage;


  return (
    <button disabled={hasNoPrevPage} css={[defaultStyle]} onClick={handlePrevButtonClick}>{children}</button>
  )
}

export default Prev