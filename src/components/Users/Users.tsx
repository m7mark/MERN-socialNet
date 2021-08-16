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
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersFromState)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFetching = useSelector(getIsFetching)
    const history = useHistory()

    const dispatch = useDispatch()
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
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
    });

    useEffect(() => {
        if (!!filter.term) setQuery({ term: filter.term });
        else { setQuery({ term: undefined }) }
        if (filter.friend !== null) setQuery({ friend: String(filter.friend) });
        else { setQuery({ friend: undefined }) }
        if (currentPage !== 1) setQuery({ page: currentPage });
        else { setQuery({ page: undefined }) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, currentPage])

    useEffect(() => {
        console.log(query)
        history.push({
            pathname: '/users',
            search: `?${stringify(query)}`
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    useEffect(() => {
        let actualPage = currentPage
        let actualFilter = filter
        if (!!query.page) actualPage = query.page
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
        dispatch(getUsers(actualPage, pageSize, actualFilter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
        />
        <UsersSearchForm
            onFilterChanged={onFilterChanged}
        />
        {isFetching ? <Preloader /> : <CurrentUsers />}
    </div>
}