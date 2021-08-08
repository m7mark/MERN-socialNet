import * as React from 'react'
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getUserProfile,
  updateStatus,
  getStatus,
  savePhoto,
  saveProfileInfo
} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../redux/store';
import { ProfileType } from '../../types/types';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  userId: string
}
interface MatchProps extends RouteComponentProps<MatchParams> {
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  getUserProfile: (userId: number | null) => void
  getStatus: (userId: number | null) => void
  updateStatus: (status: string | undefined) => Promise<void>
  savePhoto: (file: File) => void
  saveProfileInfo: (profile: ProfileType) => Promise<void>
}
type PropsType = MapStatePropsType & MapDispatchPropsType & MatchProps
class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) { userId = this.props.authorizedUserId };
    if (!userId) { this.props.history.push("/login") };
    // if (!userId) {
    //   throw new Error('ID should exists')
    // }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    return <Profile {...this.props}
      isOwner={!this.props.match.params.userId}
      profile={this.props.profile}
      status={this.props.status}
      updateStatus={this.props.updateStatus}
      savePhoto={this.props.savePhoto}
      saveProfileInfo={this.props.saveProfileInfo} />
  }
}

let mapStateToProps = (state: AppStateType) => {
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isFetching: state.profilePage.isFetching,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
  })
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfileInfo
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
