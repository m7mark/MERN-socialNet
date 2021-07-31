import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers } from '../../redux/users-reducer';
import Users from './Users';
import { compose } from 'redux';
import {
    getUsersFromState,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from '../../redux/users-selector';

class UsersContainer extends React.Component {

    componentDidMount = () => {
        let { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }
    onPageChanged = (pageNumber) => {
        let { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }
    render() {
        return <>
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

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {
        follow,
        unfollow,
        getUsers
    })
)(UsersContainer)