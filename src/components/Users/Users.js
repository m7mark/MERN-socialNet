import React from 'react';
import p from './Users.module.css'
import userIcon from './../../assets/userIcon.png'

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
        return <div>
            <div>
                {pages.map(el => {
                    return <span className={props.currentPage === el && p.activePage, p.pages}
                        onClick={(e) => { props.onPageChanged(el) }}>{el}</span>
                })}
            </div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                        <div>
                            <div>
                                <img className={p.userimg} src={u.photos.small
                                    != null ? u.photos.small : userIcon} />
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => { props.unfollow(u.id) }}>Follow</button>
                                    : <button onClick={() => { props.follow(u.id) }}>Unfollow</button>}
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