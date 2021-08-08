import profileReducer, { actions } from "./profile-reducer";

let state = {
    postData: [
        { id: 1, message: "How are you", likesCount: 12 },
        { id: 2, message: "Good and you", likesCount: 2 }],
    profile: null,
    status: '' as string | undefined,
    isFetching: false,
    newPostText: ''
}
test('new post should be added', () => {
    // start data
    let action = actions.addNewPostBody('Mark Rodovsky')
    // action
    let newState = profileReducer(state, action)
    // expectation
    expect(newState.postData.length).toBe(3);
    expect(newState.postData[2].message).toBe("Mark Rodovsky");
});

test('length after delete should be decrement', () => {
    // start data
    let action = actions.deletePost(1)
    // action
    let newState = profileReducer(state, action)
    // expectation
    expect(newState.postData.length).toBe(1);
});