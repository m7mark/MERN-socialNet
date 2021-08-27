import userIcon from './../../assets/userIcon.png';
import { Button, Card } from 'antd';
import { follow, unfollow } from '../../redux/users-reducer';
import { getFollowingInProgress, getIsFetching, getUsersFromState } from '../../redux/users-selector';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AntPreloader } from '../UI/AntPreloader';

const { Meta } = Card;

export const CurrentUsers = (): JSX.Element => {
    const users = useSelector(getUsersFromState)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFetching = useSelector(getIsFetching)
    const dispatch = useDispatch()
    const unfollowThunk = (id: number) => {
        dispatch(unfollow(id))
    }
    const followThunk = (id: number) => {
        dispatch(follow(id))
    }
    if (users.length === 0) {return <AntPreloader/>}

    return <div className='users-mapping-items'>
        {users.map(user =>
            <Card
                className='card-container'
                loading={isFetching}
                cover={<NavLink to={'/profile/' + user.id} replace>
                    <img
                        alt="profile_image"
                        src={user.photos.small
                            != null ? user.photos.small : userIcon}
                    />
                </NavLink>}
                actions={[<span>
                    {user.followed
                        ? <Button
                            className='card-action-button-followed'
                            key="following"
                            disabled={followingInProgress
                                .some(id => id === user.id)}
                            onClick={() => { unfollowThunk(user.id) }}>
                            UnFollow
                        </Button>
                        : <Button className='card-action-button' key="following"
                            disabled={followingInProgress
                                .some(id => id === user.id)}
                            onClick={() => { followThunk(user.id) }}>
                            Follow
                        </Button>}
                </span>]}
            >
                <Meta
                    title={user.name}
                    description={user.status
                        != null ? user.status.substring(0, 30) : 'Empty Status'}
                />
            </Card>
        )}
    </div>
}