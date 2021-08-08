import React from 'react';
import Header, { DispatchPropsType, StatePropsType } from './Header'
import { logout } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';

type PropsType = StatePropsType & DispatchPropsType
class HeaderContainer extends React.Component<PropsType> {

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
export default connect
    <StatePropsType, DispatchPropsType, {}, AppStateType>
    (mapStateToProps, { logout })(HeaderContainer)