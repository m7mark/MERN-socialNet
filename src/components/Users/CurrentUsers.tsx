import React, { useEffect, useState } from 'react';
import userIcon from './../../assets/userIcon.png';
import { Button, Card } from 'antd';
import {
    FilterType,
    follow,
    getUsers,
    unfollow
} from '../../redux/users-reducer';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersFromState
} from '../../redux/users-selector';
import { NavLink, useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import {
    useQueryParams,
    StringParam,
    NumberParam,
} from 'use-query-params';

const { Meta } = Card;

export const CurrentUsers = (): JSX.Element => {

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



    return <div className='users-mapping-items'>
        {users.map(user =>
            <Card
                className='card-container'
                loading={isFetching}
                cover={<NavLink to={'/profile/' + user.id} replace>
                    <img
                        alt="profile_image"
                        src={user.photos.small
                            != null ? user.photos.small : userIcon}
                    />
                </NavLink>}
                actions={[<span>
                    {user.followed
                        ? <Button
                            className='card-action-button-followed'
                            key="following"
                            disabled={followingInProgress
                                .some(id => id === user.id)}
                            onClick={() => { unfollowThunk(user.id) }}>
                            UnFollow
                        </Button>
                        : <Button className='card-action-button' key="following"
                            disabled={followingInProgress
                                .some(id => id === user.id)}
                            onClick={() => { followThunk(user.id) }}>
                            Follow
                        </Button>}
                </span>]}
            >
                <Meta
                    title={user.name}
                    description={user.status
                        != null ? user.status.substring(0, 30) : 'Empty Status'}
                />
            </Card>
        )}
    </div>

}