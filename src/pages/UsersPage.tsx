import Paginator from '../components/UI/Paginator/Paginator';
import React, { useEffect, useState } from 'react';
import UsersSearchForm from '../components/Users/UsersSearchForm';
import {
    FilterType,
    follow,
    getUsers,
    unfollow
} from '../redux/users-reducer';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersFromState
} from '../redux/users-selector';
import { stringify } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    useQueryParams,
    StringParam,
    NumberParam,
} from 'use-query-params';
import { BackTop } from 'antd';
import { CurrentUsers } from '../components/Users/CurrentUsers';


type PropsType = {
    pageTitle: string
}
export const UsersPage: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSizeState = useSelector(getPageSize)
    const filterState = useSelector(getUsersFilter)
    const users = useSelector(getUsersFromState)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFetching = useSelector(getIsFetching)
    const history = useHistory()
    const [query, setQuery] = useQueryParams({
        term: StringParam,
        friend: StringParam,
        page: NumberParam,
        count: NumberParam
    });
    const [filter, setFilter] = useState(filterState);

    const dispatch = useDispatch()
    const onPageChanged = (pageNumber: number, pageSize?: number) => {
        if (!pageNumber) { pageNumber = currentPage }
        if (!pageSize) { pageSize = pageSizeState }
        dispatch(getUsers(pageNumber, pageSize, filterState))
    }
    const onFilterChanged = (filterProps: FilterType) => {
        setFilter(filterProps)
        dispatch(getUsers(1, pageSizeState, filterProps))
    }
    const unfollowThunk = (id: number) => {
        dispatch(unfollow(id))
    }
    const followThunk = (id: number) => {
        dispatch(follow(id))
    }

    // useEffect(() => {
    //     history.push({
    //         pathname: '/users',
    //         search: `?${stringify(query)}`
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [query])
    // useEffect(() => {
    //     if (!!filter.term) setQuery({ term: filter.term });
    //     else { setQuery({ term: undefined }) }
    //     if (filter.friend !== null) setQuery({ friend: String(filter.friend) });
    //     else { setQuery({ friend: undefined }) }
    //     if (currentPage !== 1) setQuery({ page: currentPage });
    //     else { setQuery({ page: undefined }) }
    //     setQuery({ count: pageSizeState });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [filter, currentPage, pageSizeState])

    useEffect(() => {
        let actualPage = currentPage
        let actualPageSize = pageSizeState
        if (!!query.page) actualPage = query.page
        if (!!query.count) actualPageSize = query.count
        if (!!query.term) setFilter({ ...filter, term: query.term })
        switch (query.friend) {
            case 'null':
                setFilter({ ...filter, friend: null })
                break
            case 'true':
                setFilter({ ...filter, friend: true })
                break
            case 'false':
                setFilter({ ...filter, friend: false })
                break
        }
        dispatch(getUsers(actualPage, actualPageSize, filter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>
        <BackTop />
        <h2>{props.pageTitle}</h2>
        <Paginator
            totalUsersCount={totalUsersCount}
            pageSize={pageSizeState}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
        />
        <br />
        <UsersSearchForm
            onFilterChanged={onFilterChanged} />
        <CurrentUsers />
    </div>
}