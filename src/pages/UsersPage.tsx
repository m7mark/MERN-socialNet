/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BackTop } from 'antd';
import { CurrentUsers } from '../components/Users/CurrentUsers';
import { useDispatch, useSelector } from 'react-redux';
import { UserPaginator } from '../components/Users/UserPaginate';
import { UsersSearchForm } from '../components/Users/UsersSearchForm';
import {
    FilterType,
    getUsers,
} from '../redux/users-reducer';
import {
    getCurrentPage,
    getPageSize,
    getUsersFilter,
} from '../redux/users-selector';
import {
    useQueryParams,
    StringParam,
    NumberParam,
    BooleanParam,
} from 'use-query-params';


type PropsType = {
    pageTitle: string
}
export const UsersPage: React.FC<PropsType> = (props) => {
    const currentPageState = useSelector(getCurrentPage)
    const pageSizeState = useSelector(getPageSize)
    const filterState = useSelector(getUsersFilter)
    const [query, setQuery] = useQueryParams({
        term: StringParam,
        friend: BooleanParam,
        page: NumberParam,
        count: NumberParam
    });
    const [filter, setFilter] = useState<FilterType>(filterState)
    const [page, setPage] = useState<number>(currentPageState)
    const [pageSize, setPageSize] = useState<number>(pageSizeState)

    const dispatch = useDispatch()
    useEffect(() => {
        if (JSON.stringify(filter) === JSON.stringify(filterState)) {
            pageSize && dispatch(getUsers(page, pageSize, filter))
        }
        else {
            pageSize && dispatch(getUsers(1, pageSize, filter))
            setPage(1)
        }

    }, [pageSize, page, filter]);
    useEffect(() => {
        setQuery({ page: page }, 'pushIn')
        setQuery({ count: pageSize }, 'pushIn')
        if (filter.term.length === 0) setQuery({ term: undefined }, 'pushIn')
        else { setQuery({ term: filter.term }, 'pushIn') }
        if (!filter.friend) setQuery({ friend: undefined }, 'pushIn')
        else { setQuery({ friend: filter.friend }, 'pushIn') }
    }, [pageSize, page, filter]);

    return <div>
        <BackTop />
        <h2>{props.pageTitle}</h2>
        <UserPaginator setPage={setPage} setPageSize={setPageSize} />
        <br />
        <UsersSearchForm
            setFilter={setFilter} />
        <CurrentUsers />
    </div>
}