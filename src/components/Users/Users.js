import React from 'react';
import p from './Users.module.css'
import userIcon from './../../assets/userIcon.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

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
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
                                        }
                                    })
                                        .then(response => { if (response.data.resultCode == 0) { props.unfollow(u.id) } })
                                }}>UnFollow</button>
                                : <button onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
                                        }
                                    })
                                        .then(response => { if (response.data.resultCode == 0) { props.follow(u.id) } })
                                }}>Follow</button>}
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