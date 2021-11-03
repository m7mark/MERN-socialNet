import React from 'react';
import userIcon from './../../../assets/userIcon.png';
import { actions } from '../../../redux/profile-reducer';
import { ResultCodeEnum } from '../../../api/api';
import {
  Button,
  message,
  Skeleton,
  Upload
} from 'antd';
import { ParamsUserIdType } from '../../../pages/ProfilePage';
import { selectAuthId } from '../../../redux/auth-selector';
import { selectIsFetching, selectProfile } from '../../../redux/profile-selector';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { profileAPI } from '../../../api/profile-api';

type PropsType = { isProfileChanging: boolean }
export const ProfileImage: React.FC<PropsType> = ({ isProfileChanging }) => {
  const { userId } = useParams<ParamsUserIdType>();
  const dispatch = useDispatch()
  const profile = useSelector(selectProfile)
  const isFetching = useSelector(selectIsFetching)
  const authorizedUserId = useSelector(selectAuthId)

  const uploadImage = async (options: any) => {
    const response = await profileAPI.savePhoto(options.file)
    if (response.data.resultCode === ResultCodeEnum.Success) {
      message.success(`${options.file.name} uploaded successfully`);
      //add query to img url for rerender
      const photos = {
        large: `${response.data.data.large}?${global.Date.now()}`,
        small: `${response.data.data.small}?${global.Date.now()}`
      }
      dispatch(actions.savePhotoSuccess(photos))
      options.onSuccess("Ok");
    } else if (response.data.resultCode === ResultCodeEnum.Error) {
      message.error(`Upload failed: ${response.data.messages[0]}`);
      options.onError("Error");
    }
  }

  return (
    <div>
      <div className='profile-image-container' >
        {isFetching && isProfileChanging
          ? <Skeleton.Image style={{ minWidth: '200px', minHeight: '200px' }} />
          : <img src={profile?.photos.large || userIcon} alt="" ></img>}
        <div>
          {(!userId || userId === authorizedUserId) &&
            <Upload
              accept="image/*"
              customRequest={uploadImage}
            >
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