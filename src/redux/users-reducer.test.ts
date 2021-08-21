import usersReducer, { actions, InitialState } from "./users-reducer"

let state: InitialState
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Mark 0', followed: false,
                photos: { small: undefined, large: undefined }, status: 'status 0'
            },
            {
                id: 1, name: 'Mark 1', followed: false,
                photos: { small: undefined, large: undefined }, status: 'status 1'
            },
            {
                id: 2, name: 'Mark 2', followed: true,
                photos: { small: undefined, large: undefined }, status: 'status 2'
            },
            {
                id: 3, name: 'Mark 3', followed: true,
                photos: { small: undefined, large: undefined }, status: 'status 3'
            }
        ],
        pageSize: 6,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
})
test('Follow success', () => {
    // reducer()
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('Unfollow success', () => {
    // reducer()
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})