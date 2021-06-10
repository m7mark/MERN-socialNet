import React from 'react';
import p from './Users.module.css'

let Users = (props) => {
if (props.users.length === 0) {
    props.setUsers([
        {
            id: 1, fotoUrl: 'https://image.flaticon.com/icons/png/512/168/168724.png',
            followed: false, fullName: 'Horod', status: 'Hello, boss!',
            location: { city: 'NN', country: 'Russia' }
        },
        {
            id: 2, fotoUrl: 'https://image.flaticon.com/icons/png/512/168/168724.png',
            followed: true, fullName: 'Morod', status: 'Hello, me!',
            location: { city: 'Tula', country: 'Russia' }
        },
        {
            id: 3, fotoUrl: 'https://image.flaticon.com/icons/png/512/168/168724.png',
            followed: true, fullName: 'Lorod', status: 'Hello, you!',
            location: { city: 'Bolsoe', country: 'UAR' }
        }
    ])
}
    return <div> {
        props.users.map(u =>
            <div key={u.id}>
                <span>
                    <div>
                        <img className={p.userimg} src={u.fotoUrl} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>Follow</button>
                            : <button onClick={() => { props.follow(u.id) }}>Unfollow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>
        )
    }
    </div>
}

export default Users;