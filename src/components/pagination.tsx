import React from 'react';

interface PaginationProps {
  page: number;
  prevPage?: number;
  nextPage?: number;
  lastPage: number;

  onPageChange(page: number): void;
}

export default function Pagination({
  page,
  prevPage,
  nextPage,
  lastPage,
  onPageChange,
}: PaginationProps): React.ReactElement {
  return (
    <div className="pagination">
      <span className="step-links">
        {prevPage ? (
          <>
            {prevPage > 1 ? (
              <button
                type="button"
                className="pagination_button"
                onClick={(): void => onPageChange(1)}
                value={1}
              >
                1...
              </button>
            ) : ('')}
            <button
              type="button"
              className="pagination_button"
              onClick={(): void => onPageChange(prevPage)}
              value={prevPage}
            >
              {prevPage}
            </button>
          </>
        ) : ('')}
        <span className="pagination_current_page">{page}</span>
        {nextPage ? (
          <>
            <button
              type="button"
              className="pagination_button"
              onClick={(): void => onPageChange(nextPage)}
              value={nextPage}
            >
              {nextPage}
            </button>
            {nextPage && nextPage < lastPage ? (
              <button
                type="button"
                className="pagination_button"
                onClick={(): void => onPageChange(lastPage)}
                value={lastPage}
              >
                ...
                {lastPage}
              </button>
            ) : ('')}
          </>
        ) : ('')}
      </span>
    </div>
  );
}
