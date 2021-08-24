import * as React from 'react'
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getUserProfile,
  getStatus,
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
interface MatchPropsType extends RouteComponentProps<MatchParams> {
}
type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number | undefined) => void
  getStatus: (userId: number | undefined) => void
  updateStatus: (status: string | undefined) => Promise<void>
  savePhoto: (file: File) => void
  saveProfileInfo: (profile: ProfileType) => Promise<void>
}
type PropsType = StatePropsType & DispatchPropsType & MatchPropsType
class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | undefined = +this.props.match.params.userId;
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
    />
  }
}

let mapStateToProps = (state: AppStateType) => {
  return ({
    isFetching: state.profilePage.isFetching,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
  })
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    saveProfileInfo
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
