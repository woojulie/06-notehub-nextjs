'use client';

import ReactPaginate from 'react-paginate';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: Props) {
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
