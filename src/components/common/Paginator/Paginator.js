import React from 'react';
import p from './Paginator.module.css'

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div>
        {pages.map(el => {
            return <span className={p.pages}>
                <span className={props.currentPage === el && p.activePage}
                    onClick={(e) => { props.onPageChanged(el) }}>{el}
                </span>
            </span>
        })}
    </div>
}

export default Paginator;