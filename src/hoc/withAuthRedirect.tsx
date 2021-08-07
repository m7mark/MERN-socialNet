import * as React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/store';

let mapStateToPropsforRedirect = (state: AppStateType) => ({
        isAuth: state.auth.isAuth
});

type MapStateType = {
        isAuth: boolean
}
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
        const RedirectComponent: React.FC<MapStateType> = (props) => {
                let { isAuth, ...restProps } = props
                if (!isAuth) return <Redirect to={"/login"} />
                return <WrappedComponent {...restProps as WCP} />
        }
        let ConnectedAuthRedirectComponent = connect
                <MapStateType, {}, WCP, AppStateType>
                (mapStateToPropsforRedirect)
                (RedirectComponent)
        return ConnectedAuthRedirectComponent;
};