import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers } from '../../redux/users-reducer';
import Users, { StatePropsType } from './Users';
import { compose } from 'redux';
import {
    getUsersFromState,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from '../../redux/users-selector';
import { AppStateType } from '../../redux/store';

type DispatchPropsType = {
    unfollow: (id: number) => void
    follow: (id: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = StatePropsType & DispatchPropsType & OwnPropsType
class UsersContainer extends React.Component<PropsType> {
    componentDidMount = () => {
        let { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }
    onPageChanged = (pageNumber: number) => {
        let { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }
    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}
                isFetching={this.props.isFetching}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): StatePropsType => {
    return {
        users: getUsersFromState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<StatePropsType, DispatchPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, {
            follow,
            unfollow,
            getUsers
        }))(UsersContainer)