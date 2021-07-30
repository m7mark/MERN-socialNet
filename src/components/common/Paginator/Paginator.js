import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginator.css'

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let handlePageClick = (data) => {
        let selected = data.selected+1;
        props.onPageChanged(selected)
    }
    return <div>
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pagesCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
    </div>
}

export default Paginator;