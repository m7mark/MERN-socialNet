import React, { ChangeEvent, useEffect, useState } from 'react'
import p from './ProfileInfo.module.css'

type PropsType = {
    status: string | undefined
    updateStatus: (status: string | undefined) => Promise<void>
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.select();
    }
    const activateEditMode = () => {
        setErrorMessage(null);
        setEditMode(true)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status).catch(error => {
            error.length > 0 &&
                setErrorMessage(error);
        });
    }
    return (
        <div className={p.description}>
            {!editMode &&
                <div>
                    <span><b>Status: </b></span>
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
            <div className={p.error}><b>
                {errorMessage && errorMessage}
            </b>
            </div>
        </div>
    )
}
export default ProfileStatusWithHooks;

