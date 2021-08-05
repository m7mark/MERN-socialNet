import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';
import User from './User';
import { UserType } from "../../types/types";


type Props = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    followingInProgress: Array<number>
    users: Array<UserType>
    isFetching: boolean
    unfollow: (id: number) => void
    follow: (id: number) => void
    onPageChanged: (pageNumber: number) => void
}

let Users: React.FC<Props> = (props) => {
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
            // currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
        />
        {props.isFetching ? <Preloader /> : <CurrentUsers />}
    </div>
}

export default Users;