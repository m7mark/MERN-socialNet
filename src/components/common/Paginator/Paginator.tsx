import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Paginator.css'

type Props = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (selected: number) => void
    currentPage: number
}
const Paginator: React.FC<Props> = (props) => {
    const [page, setPage] = useState(0);
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pageSize = props.pageSize;
    const handlePageClick = (data: any) => {
        const selectedPage = data.selected
        setPage(selectedPage)
    }
    useEffect(() => {
        props.onPageChanged(page + 1)
    }, [page])
    return <div>
        <ReactPaginate
            forcePage={props.currentPage - 1}
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