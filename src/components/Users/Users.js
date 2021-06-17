import * as axios from 'axios';
import React from 'react';
import p from './Users.module.css'
import userIcon from './../../assets/userIcon.png'


let Users = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            // let headers = {'f1044d61-6ff5-426d-9719-a80a9bdbb47b': value}
            // axios.post("https://social-network.samuraijs.com/api/1.0", {headers: headers});
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                debugger;
                props.setUsers(response.data.items)
            });
        }
    }
    return <div>
        <button onClick={getUsers}>Get Uers</button>
        {
            props.users.map(u =>
                <div key={u.id}>
                    <span>
                        <div>
                            <img className={p.userimg} src={u.photos.small
                                != null ? u.photos.small : userIcon} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Follow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Unfollow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>
            )
        }
    </div>
}

export default Users;