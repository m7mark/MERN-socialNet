import * as axios from 'axios';
import React from 'react';
import p from './Users.module.css'
import userIcon from './../../assets/userIcon.png'

class Users extends React.Component {

    componentDidMount = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        });
    }
    render() {
        return <div>
            {
                this.props.users.map(u =>
                    <div key={u.id}>
                        <span>
                            <div>
                                <img className={p.userimg} src={u.photos.small
                                    != null ? u.photos.small : userIcon} />
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => { this.props.unfollow(u.id) }}>Follow</button>
                                    : <button onClick={() => { this.props.follow(u.id) }}>Unfollow</button>}
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
}

export default Users;