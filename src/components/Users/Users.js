import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = (props) => {

    return <div>
        <Paginator
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
        />
        {
            props.users.map(u => <User
                user={u}
                key={u.id}
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow} />)
        }
    </div>
}

export default Users;