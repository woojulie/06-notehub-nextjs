'use client';

import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={selected => onPageChange(selected.selected + 1)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName="pagination"
      activeClassName="active"
      previousLabel="←"
      nextLabel="→"
    />
  );
}
