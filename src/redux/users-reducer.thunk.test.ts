import { actions, follow, unfollow } from "./users-reducer"
import { userAPI } from "../api/users-api"
import { CommonResponseType, ResultCodeEnum } from "../api/api"

jest.mock('../api/users-api')
const dispatchMock = jest.fn()
const getState = jest.fn()
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>

beforeEach(() => {
    dispatchMock.mockClear()
    getState.mockClear()
    userAPIMock.follow.mockClear()
})

const result: CommonResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
}

test('Follow thunk success', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(3)

    await thunk(dispatchMock, getState, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 3))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 3))
})

test('Unfollow thunk success', async () => {
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(3)

    await thunk(dispatchMock, getState, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 3))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 3))
})