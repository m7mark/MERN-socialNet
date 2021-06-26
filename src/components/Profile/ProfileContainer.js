import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userId)
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});


let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, { getUserProfile })
  (WithUrlDataContainerComponent);
