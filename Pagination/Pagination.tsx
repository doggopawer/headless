// Pagination.js
import React, { createContext, useContext, useState } from 'react';
import Size from './Size';
import Prev from './Prev';
import Next from './Next';
import Pages from './Pages';
import FastPrev from './FastPrev';
import FastNext from './FastNext';


type PaginationType = {
    page: number;
    size: number;
    total: number;
}
type PaginationContextType = {
    paginationValue: PaginationType;
    goToPrevPage: () => void;
    goToNextPage: () => void;
    goToPage: (value:number) => void;
    changeSize: (value:number) => void;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    startPage: number;
    endPage: number;
    goToFastPrevPage: () => number;
    goToFastNextPage: () => number;
};

const PaginationContext = createContext<PaginationContextType>({
    paginationValue: {
        page: 0,
        size: 0,
        total: 0,
    },
    goToPrevPage: () => {},
    goToNextPage: () => {},
    goToPage: (value) => {},
    changeSize: (value) => {},
    hasPrevPage: false,
    hasNextPage: false,
    startPage: 0,
    endPage: 0,
    goToFastPrevPage: () => 0,
    goToFastNextPage: () => 0,
});

type PaginationProps = {
    children: React.ReactNode;
    defaultValue: PaginationType;
};

const Pagination = ({ children, defaultValue }: PaginationProps) => {
    const [paginationValue, setPaginationValue] = useState(defaultValue ?? {
        page: 0,
        size: 0,
        total: 0,
    });

    const {page, size, total} = paginationValue;
    
    const goToPrevPage = () => {
        const newPaginationValue = structuredClone(paginationValue);
        const {page} = newPaginationValue;

        if(page > 0) {
            newPaginationValue.page--;
        }
        setPaginationValue(newPaginationValue);
    }

    const goToNextPage = () => {
        const newPaginationValue = structuredClone(paginationValue);
        const {page, total} = newPaginationValue;

        if(page <  total) {
            newPaginationValue.page++;
        }
        setPaginationValue(newPaginationValue);
    }
    
    const goToPage = (value: number) => {
        const newPaginationValue = structuredClone(paginationValue);
        newPaginationValue.page = value;

        setPaginationValue(newPaginationValue);
    }

    const changeSize = (value:number) => {
        const newPaginationValue = structuredClone(paginationValue);
        newPaginationValue.size = value;

        setPaginationValue(newPaginationValue);
    }

    const hasPrevPage = paginationValue.page > 0;
    const hasNextPage = paginationValue.page < paginationValue.total;

    // 최대 몇 개의 페이지 번호 버튼을 보여줄지 결정
  const maxPageButtons = 5;
  const totalPages = total + 1; // total은 최대 페이지 인덱스이므로 실제 페이지 개수

  // 현재 페이지를 가운데에 두도록 시작/끝 페이지 계산
  let startPage = Math.max(0, page - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > total) {
    endPage = total;
    startPage = Math.max(0, endPage - maxPageButtons + 1);
  }

   // "빠른 이전" 버튼: 현재 페이지에서 maxPageButtons 만큼 뺀 값(또는 0)을 이동
   const goToFastPrevPage = () => {
    const newPage = Math.max(0, page - maxPageButtons);
    goToPage(newPage);
    return newPage;
  };

  // "빠른 이후" 버튼: 현재 페이지에서 maxPageButtons 만큼 더한 값(또는 total)을 이동
  const goToFastNextPage = () => {
    const newPage = Math.min(total, page + maxPageButtons);
    goToPage(newPage);
    return newPage;
  };

    return (
        <PaginationContext.Provider value={{ paginationValue, goToPrevPage, goToNextPage,goToPage, changeSize, hasPrevPage, hasNextPage, startPage, endPage, goToFastPrevPage, goToFastNextPage }}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = () => {
    return useContext(PaginationContext);
};

export default Pagination;

Pagination.Size = Size;
Pagination.Prev = Prev;
Pagination.Next = Next;
Pagination.Pages = Pages;
Pagination.FastPrev = FastPrev;
Pagination.FastNext = FastNext;
