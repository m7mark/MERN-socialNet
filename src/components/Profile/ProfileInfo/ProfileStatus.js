import * as React from 'react'
import p from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = {
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
        })
    }
    render() {
        return (
            <div className={p.description}>
                {!this.state.editMode && <div><span onDoubleClick
                    ={this.activateEditMode}> {this.props.status}
                </span></div>}
                {this.state.editMode && <div><span onBlur
                    ={this.deactivateEditMode}> <input autoFocus={true} onFocus
                        ={this.handleFocus} value={this.props.status}></input>
                </span></div>}
            </div>
        )
    }
}
export default ProfileStatus;

