import React from 'react';

export default function Pagination(props) {
  return (
    <div className="pagination">
      <span className="step-links">
        {props.prevPage ? (
          <React.Fragment>
            {props.prevPage > 1 ? (
              <button
                className="pagination_button"
                onClick={props.onPageChange}
                value={1}
              >1...</button>
            ) : ("")}
            <button
              className="pagination_button"
              onClick={props.onPageChange}
              value={props.prevPage}
            >{props.prevPage}</button>
          </React.Fragment>
        ) : ("")}
        <span className="pagination_current_page">{props.page}</span>
        {props.nextPage ? (
          <React.Fragment>
            <button
              className="pagination_button"
              onClick={props.onPageChange}
              value={props.nextPage}
            >{props.nextPage}</button>
            {props.nextPage && props.nextPage < props.lastPage ? (
              <button
                className="pagination_button"
                onClick={props.onPageChange}
                value={props.lastPage}
              >...{props.lastPage}</button>
            ) : ("")}
          </React.Fragment>
        ) : ("")}
      </span>
    </div>
  );
}
