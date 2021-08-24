import { actions, saveProfileInfo } from '../../../redux/profile-reducer';
import { AntPreloader } from '../../UI/AntPreloader';
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState
    } from 'react';
import { ProfileType } from '../../../types/types';
import { selectIsLoaded, selectProfile, selectProfileErrorMessage } from '../../../redux/profile-selector';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Checkbox,
    Form,
    Input,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

type PropsType = {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const ProfileEditForm: React.FC<PropsType> = ({ setIsModalVisible }) => {
    const [form] = Form.useForm();
    const profile = useSelector(selectProfile)
    const isLoaded = useSelector(selectIsLoaded)
    const [isFetchingState, setisFetchingState] = useState(false);
    const profileErrorMessage = useSelector(selectProfileErrorMessage)
    const cleaErrorLoginMessage = () => dispatch(actions.profileSaveErrorMessage(''))
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoaded) {
            setIsModalVisible(false);
            cleaErrorLoginMessage()
            setisFetchingState(false)
            dispatch(actions.profileIsLoaded(false))
            dispatch(actions.profileIsFetching(false))

        }
        if (profileErrorMessage) {
            setisFetchingState(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, profileErrorMessage]);

    const onFinish = (values: ProfileType) => {
        setisFetchingState(true)
        dispatch(saveProfileInfo(values))
        if (profileErrorMessage) {
            setisFetchingState(false)
        }
    }
    if (!profile) { return <AntPreloader /> }
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="profileInfo"
            onFinish={onFinish}
            onValuesChange={cleaErrorLoginMessage}
            initialValues={{ ...profile }}
            scrollToFirstError
        >
            <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                    { required: true, message: 'Please input your Full Name!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="aboutMe"
                label="About Me"
                rules={[
                    { required: true, message: 'Please tell About Yourself!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="lookingForAJob"
                valuePropName="checked"
                label='Looking for a job'
            >
                <Checkbox />
            </Form.Item>
            <Form.Item
                name="lookingForAJobDescription"
                label="Skills"
                tooltip="What do you want others to know about you?"
            >
                <Input />
            </Form.Item>
            <Form.Item {...profileErrorMessage && {
                help: profileErrorMessage,
                validateStatus: 'error',
            }}
                {...tailFormItemLayout}>
                <div>Contacts:</div>
            </Form.Item>
            {profile && Object.keys(profile.contacts).map(key => {
                return (
                    <Form.Item
                        key={key}
                        noStyle
                    >
                        <Form.Item
                            label={key}
                            name={['contacts', key]}
                        >
                            <Input />
                        </Form.Item>
                    </Form.Item>
                )
            })}
            <Form.Item {...tailFormItemLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<UploadOutlined />}
                    loading={isFetchingState}
                >
                    Save Profile Info
                </Button>
            </Form.Item>
        </Form>
    );
}

