import React, { useEffect, useState } from 'react'
import p from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const handleFocus = (event) => {
        event.target.select();
    }
    const activateEditMode = () => {
        setEditMode(true)
    }
    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }
    return (
        <div className={p.description}>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {props.status || 'Please enter status...'}
                    </span>
                </div>}
            {editMode &&
                <div>
                    <span
                        onBlur={deactivateEditMode}
                    >
                        <input
                            onChange={onStatusChange}
                            value={status}
                            autoFocus={true}
                            onFocus={handleFocus}
                        >
                        </input>
                    </span>
                </div>}
        </div>
    )
}
export default ProfileStatusWithHooks;

