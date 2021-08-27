import React, { useEffect, useState } from 'react';
import userIcon from './../../../assets/userIcon.png';
import { actions } from '../../../redux/profile-reducer';
import { apiKey, ResultCodeEnum } from '../../../api/api';
import { Button, message, Skeleton, Upload } from 'antd';
import { selectIsFetching, selectProfile } from '../../../redux/profile-selector';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAuthId } from '../../../redux/auth-selector';
import { ParamsUserIdType } from '../../../pages/ProfilePage';

type PropsType = { isProfileChanging: boolean }
export const ProfileImage: React.FC<PropsType> = ({ isProfileChanging }) => {
    const { userId } = useParams<ParamsUserIdType>();
    const dispatch = useDispatch()
    const profile = useSelector(selectProfile)
    const isFetching = useSelector(selectIsFetching)
    const authorizedUserId = useSelector(selectAuthId)

    const props = {
        name: 'image',
        action: 'https://social-network.samuraijs.com/api/1.0/profile/photo',
        headers: {
            'API-KEY': apiKey,
        },
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
            <div className='profile-image-container' >
                {isFetching && isProfileChanging
                    ? <Skeleton.Image style={{ minWidth: '200px', minHeight: '200px' }} />
                    : <img src={profile?.photos.large || userIcon} alt="" ></img>}
                <div>
                    {(!userId || +userId === authorizedUserId) &&
                        <Upload withCredentials {...props} >
                            <Button
                                className='profile-image-button'
                                block
                                ghost
                                type='primary'
                                icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>}
                </div>
            </div>
        </div>
    )
}