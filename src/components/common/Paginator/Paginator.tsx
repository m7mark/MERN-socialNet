import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginator.css'

type Props ={
    totalUsersCount: number
    pageSize: number
    onPageChanged: (selected: number) => void
}
let Paginator: React.FC<Props> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pageSize = props.pageSize;
    let handlePageClick = (data: any) => {
        let selected = data.selected + 1;
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
            pageRangeDisplayed={pageSize}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
    </div>
}

export default Paginator;