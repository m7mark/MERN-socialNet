import Preloader from '../../common/Preloader/Preloader';
import { actions, saveProfileInfo } from '../../../redux/profile-reducer';
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState
} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ProfileType } from '../../../types/types';
import { selectIsFetching, selectProfile, selectProfileErrorMessage } from '../../../redux/profile-selector';
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

export const ProfileDataForm: React.FC<PropsType> = ({ setIsModalVisible }) => {
    const [form] = Form.useForm();
    const profile = useSelector(selectProfile)
    const isFetching = useSelector(selectIsFetching)
    const [isFetchingState, setisFetchingState] = useState(false);
    const profileErrorMessage = useSelector(selectProfileErrorMessage)
    const cleaErrorLoginMessage = () => dispatch(actions.profileSaveErrorMessage(''))
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isFetching) {
            setIsModalVisible(false);
            cleaErrorLoginMessage()
            dispatch(actions.profileIsFetching(true))
            setisFetchingState(false)
        }
        if (profileErrorMessage) {
            setisFetchingState(false)
        }
    }, [isFetching, profileErrorMessage]);

    const onFinish = (values: ProfileType) => {
        setisFetchingState(true)
        dispatch(saveProfileInfo(values))
        if (profileErrorMessage) {
            setisFetchingState(false)
        }
    };

    if (!profile) { return <Preloader /> }
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

