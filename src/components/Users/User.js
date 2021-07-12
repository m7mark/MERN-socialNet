import React from 'react';
import p from './Users.module.css'
import userIcon from './../../assets/userIcon.png'
import { NavLink } from 'react-router-dom';

let User = ({ user, followingInProgress, unfollow, follow }) => {
    return <div className={p.commonPadding}>
        <div>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={p.userimg} src={user.photos.small
                        != null ? user.photos.small : userIcon} alt="" />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress
                        .some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>
                        UnFollow</button>
                    : <button disabled={followingInProgress
                        .some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>
                        Follow</button>}
            </div>
        </div>
        <div>
            <div>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
            <div>
                {/* <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div> */}
            </div>
        </div>
    </div>
}

export default User;