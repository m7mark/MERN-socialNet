import React from 'react';
import './Paginator.css'
import { Pagination } from 'antd';

type Props = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number, pageSize?: number) => void
    currentPage: number
}

const Paginator: React.FC<Props> = (props) => {
    const onChange = (pageNumber: number, pageSize?: number) => {
        props.onPageChanged(pageNumber, pageSize)
    }
    return (
        <Pagination showQuickJumper
            pageSize={props.pageSize}
            current={props.currentPage}
            total={props.totalUsersCount}
            onChange={onChange}
            responsive={true}
        />
    );
}

export default Paginator;