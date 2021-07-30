import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';
import User from './User';

let Users = (props) => {
    let CurrentUsers = () => {
        return props.users.map(u => <User
            user={u}
            key={u.id}
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow} />)
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