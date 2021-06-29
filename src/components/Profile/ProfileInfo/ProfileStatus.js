import * as React from 'react'
import p from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = {
        status: '',
        editMode: false
    }
    handleFocus = (event) => {
        event.target.select();
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({ status: e.target.value })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }
    render() {
        return (
            <div className={p.description}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || 'Please enter status...'}
                        </span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <span onBlur={this.deactivateEditMode}>
                            <input
                                onChange={this.onStatusChange}
                                value={this.state.status}
                                autoFocus={true}
                                onFocus={this.handleFocus}>
                            </input>
                        </span>
                    </div>}
            </div>
        )
    }
}
export default ProfileStatus;

