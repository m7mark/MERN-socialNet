import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';
import User from './User';
import { UserType } from "../../types/types";
import { UsersSearchForm } from './UsersSearchForm';
import { FilterType } from '../../redux/users-reducer';

export type StatePropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    followingInProgress: Array<number>
    users: Array<UserType>
    isFetching: boolean
    filter: FilterType
}
export type DispatchPropsType = {
    unfollow: (id: number) => void
    follow: (id: number) => void
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void

}
type PropsType = StatePropsType & DispatchPropsType
let Users: React.FC<PropsType> = (props) => {
    let CurrentUsers = (): JSX.Element => {
        return <>
            {props.users.map(u => <User
                user={u}
                key={u.id}
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow} />)}
        </>
    }

    return <div>
        <Paginator
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
        />
        <UsersSearchForm 
        onFilterChanged={props.onFilterChanged}
        />
        {props.isFetching ? <Preloader /> : <CurrentUsers />}
    </div>
}

export default Users;