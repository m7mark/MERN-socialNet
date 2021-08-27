import React, { useState } from 'react';
import { HighlightOutlined } from '@ant-design/icons';
import { selectIsFetching, selectStatus } from '../../../redux/profile-selector';
import { Skeleton, Typography } from 'antd';
import { updateStatus } from '../../../redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAuthId } from '../../../redux/auth-selector';

const { Text, Paragraph } = Typography;
type PropsType = { isProfileChanging: boolean }
export const ProfileStatus: React.FC<PropsType> = ({ isProfileChanging }) => {

    const status = useSelector(selectStatus)
    const [errorMessage, setErrorMessage] = useState(null);
    const { userId }: any = useParams<number>();
    const dispatch = useDispatch()
    const isFetching = useSelector(selectIsFetching)
    const authorizedUserId = useSelector(selectAuthId)
    const saveNewStatus = (e: string) => {
        dispatch(updateStatus(e))
        // .catch(error => {error.length > 0 && setErrorMessage(error)});
    }
    return (
        <div>
            {isFetching && isProfileChanging
                ? <Skeleton active title={false} paragraph={{ rows: 2 }} />
                : <div>
                    <Text type="secondary">Status: </Text>
                    {!userId || +userId === authorizedUserId
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
                        : <div style={{ marginBottom: '10px' }}>{status || 'Please enter status...'}</div>}
                </div>}
            {/* toDo : refactor errors */}
            <div><b>
                {errorMessage && errorMessage}
            </b>
            </div>
        </div>
    )
}
