import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (pageNumber: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePageChange(1);
    onRowsPerPageChange(Number(e.target.value));
  };

  return (
    <div className="flex gap-6 py-6">
      <button
        onClick={handleFirstPage}
        disabled={page === 1}
        className="bg-gray-400 rounded-lg py-1 px-3 text-white"
      >
        First
      </button>
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="bg-gray-400 rounded-lg py-1 px-3 text-white"
      >
        Prev
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className="bg-gray-400 rounded-lg py-1 px-3 text-white"
      >
        Next
      </button>
      <button
        onClick={handleLastPage}
        disabled={page === totalPages}
        className="bg-gray-400 rounded-lg py-1 px-3 text-white"
      >
        Last
      </button>
      <select
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
        className="border border-gray-400 rounded-lg py-1 px-3 mr-2"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>Items per page</span>
    </div>
  );
};

export default Pagination;
