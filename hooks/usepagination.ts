import { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  goToPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  getVisiblePages: () => number[];
};

const usePagination = (totalPages: number, initialCurrentPage: number): PaginationProps => {
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const getVisiblePages = (): number[] => {
    const visiblePages: Array<number> = [];
    let startPage: number = currentPage - 2;
    if (startPage <= 0) {
      startPage = 1;
    }
    let endPage = startPage + 3;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - 3, 1);
    }
    for (let i: number = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  return { currentPage, goToPage, nextPage, prevPage, getVisiblePages };
}

export { usePagination };
