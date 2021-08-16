import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import { FilterType, getUsers, follow, unfollow } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersFilter, getUsersFromState } from '../../redux/users-selector';
import { useHistory } from 'react-router-dom';


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
    const queryString = require('query-string');


    useEffect(() => {
        const parsed = queryString.parse(history.location.search);
        console.log(parsed)
        console.log(history.location.search)
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    // useEffect(() => {
    //     history.push({
    //         pathname: '/users',
    //         search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    //     })
    // }, [filter, currentPage])


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