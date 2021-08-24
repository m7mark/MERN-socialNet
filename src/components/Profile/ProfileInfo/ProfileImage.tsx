import React from 'react';
import userIcon from './../../../assets/userIcon.png';
import { actions } from '../../../redux/profile-reducer';
import { apiKey, ResultCodeEnum } from '../../../api/api';
import { Button, message, Upload } from 'antd';
import { selectProfile } from '../../../redux/profile-selector';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const ProfileImage: React.FC = () => {

    const profile = useSelector(selectProfile)
    const { userId }: any = useParams();
    const dispatch = useDispatch()
    const props = {
        name: 'image',
        action: 'https://social-network.samuraijs.com/api/1.0/profile/photo',
        headers: {
            'API-KEY': apiKey,
        },
        withCredentials: true,
        onChange(info: any) {
            if (info.file.status === 'done'
                && info.file.response.resultCode === ResultCodeEnum.Success) {
                message.success(`${info.file.name} uploaded successfully`);
                dispatch(actions.savePhotoSuccess(info.file.response.data.photos))
            } else if (info.file.status === 'done'
                && info.file.response.resultCode === ResultCodeEnum.Error) {
                message.error(`Upload failed: ${info.file.response.messages[0]}`);
            }
            else if (info.file.status === 'error') {
                message.error(`Upload failed: ${info.file.response?.messages[0]}`);
            }
        },
    };

    return (
        <div>
            <div>
                <img src={profile?.photos.large || userIcon}
                    style={{ maxWidth: '200px', marginBottom: '10px' }} alt="" ></img>
            </div>
            <div>
                {!userId && <Upload {...props}>
                    <Button
                        size='small'
                        ghost
                        type='primary'
                        icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>}
            </div>
        </div>
    )
}