import { Typography } from 'antd';
import React, { useState } from 'react'
import p from './ProfileInfo.module.css'
import { HighlightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus } from '../../../redux/profile-selector';
import { updateStatus } from '../../../redux/profile-reducer';

const { Text, Paragraph } = Typography;
type PropsType = {
    isOwner: boolean
}
export const ProfileStatusWithHooks: React.FC<PropsType> = ({ isOwner }) => {

    const status = useSelector(selectStatus)
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch()
    const saveNewStatus = (e: string) => {
        dispatch(updateStatus(e))
        // .catch(error => {
        //     error.length > 0 &&
        //         setErrorMessage(error);
        // });
    }
    return (
        <div>
            <div>
                <Text type="secondary">Status: </Text>
                {isOwner
                    ? <Paragraph
                        editable={{
                            icon: <HighlightOutlined />,
                            tooltip: 'click to edit status',
                            autoSize: true,
                            maxLength: 300,
                            onStart: () => setErrorMessage(null),
                            onChange: saveNewStatus,
                        }}
                    >
                        {status || 'Please enter status...'}
                    </Paragraph>
                    : <div style={{marginBottom:'10px'}}>{status || 'Please enter status...'}</div>}
            </div>
            <div className={p.error}><b>
                {errorMessage && errorMessage}
            </b>
            </div>
        </div>
    )
}
