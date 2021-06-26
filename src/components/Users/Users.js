import React from 'react';
import p from './Users.module.css'
import userIcon from './../../assets/userIcon.png'
import { NavLink } from 'react-router-dom';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div>
        <div>
            {pages.map(el => {
                return <span className={p.pages}><span className={props.currentPage === el && p.activePage}
                    onClick={(e) => { props.onPageChanged(el) }}>{el}</span></span>
            })}
        </div>
        {
            props.users.map(u =>
                <div key={u.id}>
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={p.userimg} src={u.photos.small
                                    != null ? u.photos.small : userIcon} alt="" />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress
                                    .some(id => id === u.id)} onClick={() => {
                                        props.unfollow(u.id)
                                    }}>
                                    UnFollow</button>
                                : <button disabled={props.followingInProgress
                                    .some(id => id === u.id)} onClick={() => {
                                        props.follow(u.id)
                                    }}>
                                    Follow</button>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                        <div>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
}

export default Users;