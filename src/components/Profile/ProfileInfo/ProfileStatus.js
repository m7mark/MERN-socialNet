import * as React from 'react'
import p from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = {
        status: this.props.status,
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
    render() {
        return (
            <div className={p.description}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status}
                        </span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <span onBlur={this.deactivateEditMode}>
                            <input
                                value={this.state.status || '---------'}
                                autoFocus={true}
                                onChange={this.onStatusChange}
                                onFocus={this.handleFocus}>
                            </input>
                        </span>
                    </div>}
            </div>
        )
    }
}
export default ProfileStatus;

