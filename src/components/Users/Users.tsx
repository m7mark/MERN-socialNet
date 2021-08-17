import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import { FilterType, getUsers, follow, unfollow } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersFilter, getUsersFromState } from '../../redux/users-selector';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import {
    useQueryParams,
    StringParam,
    NumberParam,
} from 'use-query-params';


type PropsType = {
    pageTitle: string
}
export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSizeState = useSelector(getPageSize)
    const filterState = useSelector(getUsersFilter)
    const users = useSelector(getUsersFromState)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFetching = useSelector(getIsFetching)
    const history = useHistory()

    const dispatch = useDispatch()
    const onPageChanged = (pageNumber: number, pageSize?: number) => {
        if (!pageNumber) { pageNumber = currentPage }
        if (!pageSize) { pageSize = pageSizeState }
        // if (!filter) { filter = filterState }
        dispatch(getUsers(pageNumber, pageSize, filterState))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSizeState, filter))
    }
    const unfollowThunk = (id: number) => {
        dispatch(unfollow(id))
    }
    const followThunk = (id: number) => {
        dispatch(follow(id))
    }
    const [query, setQuery] = useQueryParams({
        term: StringParam,
        friend: StringParam,
        page: NumberParam,
        count: NumberParam
    });

    useEffect(() => {
        if (!!filterState.term) setQuery({ term: filterState.term });
        else { setQuery({ term: undefined }) }
        if (filterState.friend !== null) setQuery({ friend: String(filterState.friend) });
        else { setQuery({ friend: undefined }) }
        if (currentPage !== 1) setQuery({ page: currentPage });
        else { setQuery({ page: undefined }) }
        setQuery({ count: pageSizeState });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterState, currentPage, pageSizeState])

    useEffect(() => {
        let actualPage = currentPage
        let actualPageSize = pageSizeState
        let actualFilter = filterState
        if (!!query.page) actualPage = query.page
        if (!!query.count) actualPageSize = query.count
        if (!!query.term) actualFilter = { ...actualFilter, term: query.term }
        switch (query.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
                break
        }
        dispatch(getUsers(actualPage, actualPageSize, actualFilter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        history.push({
            pathname: '/users',
            search: `?${stringify(query)}`
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const CurrentUsers = (): JSX.Element => {
        return <>
            {users.map(u => <User
                user={u}
                key={u.id}
                followingInProgress={followingInProgress}
                unfollow={unfollowThunk}
                follow={followThunk} />)}
        </>
    }

    return <div>
        <h2>{props.pageTitle}</h2>
        <Paginator
            totalUsersCount={totalUsersCount}
            pageSize={pageSizeState}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
        />
        <br />
        <UsersSearchForm
            onFilterChanged={onFilterChanged}
        />
        {isFetching ? <Preloader /> : <CurrentUsers />}
    </div>
}