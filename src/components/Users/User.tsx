import React from 'react';
import p from './Users.module.css'
import userIcon from './../../assets/userIcon.png'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { Button } from 'antd';

type PropsType = {
    followingInProgress: Array<number>
    user: UserType
    unfollow: (id: number) => void
    follow: (id: number) => void
}
let User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return <div className='user-current-card'>
        <div>
            <div>
                <NavLink to={'/profile/' + user.id} replace>
                    <img className={p.userimg} src={user.photos.small
                        != null ? user.photos.small : userIcon} alt="" />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <Button
                        type="primary"
                        ghost
                        size='small'
                        disabled={followingInProgress
                            .some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>
                        UnFollow
                    </Button>
                    : <Button
                        type="primary"

                        size='small'
                        disabled={followingInProgress
                            .some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>
                        Follow
                    </Button>}
            </div>
        </div>
        <div>
            <div>
                <div>{user.name}</div>
                <div>{user.status?.substring(0, 20)}</div>
            </div>
        </div>
    </div>
}

export default User;