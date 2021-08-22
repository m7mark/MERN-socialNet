import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../../redux/profile-selector';
import { ContactsType, ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { saveProfileInfo } from '../../../redux/profile-reducer';

const { Option } = Select;

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

export const ProfileDataForm: React.FC = () => {
    const [form] = Form.useForm();
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()
    const onFinish = (values: any) => {
        dispatch(saveProfileInfo(values))
        console.log('Received values of form: ', values);
    };
    if (!profile) {
        return <Preloader />
    }
    return (
        <Form
            {...formItemLayout}

            form={form}
            name="profileInfo"
            onFinish={onFinish}
            initialValues={{ ...profile }}
            scrollToFirstError
        >
            <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Full Name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="aboutMe"
                label="About Me"
                rules={[
                    {
                        required: true,
                        message: 'Please tell About Yourself!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="lookingForAJob"
                valuePropName="checked"
                label='Looking for a job'
            // rules={[
            //     {
            //         validator: (_, value) =>
            //             value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            //     },
            // ]}
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
            <Form.Item {...tailFormItemLayout}>
                <div>Contacts:</div>
            </Form.Item>
            {Object.keys(profile.contacts).map(key => {
                return <Form.Item
                    key={key}
                    label={key}
                >
                    <Form.Item
                        // initialValue={{ ...profile.contacts }}
                        name={'contacts.' + key}>
                        <Input value={profile.contacts[key]} />
                    </Form.Item>
                </Form.Item>
            })}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );






















    // const [errorMessage, setErrorMessage] = useState();
    // const formik = useFormik({
    //     initialValues: { ...profile },
    //     onSubmit: values => {
    //         // todo: remove then
    //         console.log(values)

    //     },
    // });
    // if (!profile) {
    //     return <Preloader />
    // }
    // return (
    //     <form onSubmit={formik.handleSubmit}>
    //         { }
    //         <div className={p.error}><b>
    //             {errorMessage && errorMessage}
    //         </b></div>
    //         <br />
    //         <label htmlFor="fullName">Full Name </label>
    //         <input
    //             id="fullName"
    //             name="fullName"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.fullName}
    //         />
    //         <br />
    //         <label htmlFor="aboutMe">About Me </label>
    //         <input
    //             id="aboutMe"
    //             name="aboutMe"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.aboutMe}
    //         />
    //         <br />
    //         <label htmlFor="lookingForAJob">Looking for a job </label>
    //         <input
    //             id="lookingForAJob"
    //             name="lookingForAJob"
    //             type="checkbox"
    //             onChange={() => formik.setFieldValue(
    //                 "lookingForAJob", !formik.values.lookingForAJob)}
    //             checked={formik.values.lookingForAJob}
    //         />
    //         <br />
    //         <label htmlFor="lookingForAJobDescription">Looking job description </label>
    //         <input
    //             id="lookingForAJobDescription"
    //             name="lookingForAJobDescription"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.lookingForAJobDescription}
    //         />
    //         <br />
    //         <div><b>Contacts:</b>
    //             {Object.keys(profile.contacts).map(key => {
    //                 return <div key={key}>
    //                     <div><label htmlFor={key}>{key}</label></div>
    //                     <input
    //                         id={key}
    //                         name={"contacts." + key}
    //                         type="text"
    //                         onChange={formik.handleChange}
    //                         //@ts-ignore
    //                         value={formik.values.contacts[key as keyof ContactsType]} /> </div>
    //             })}
    //         </div>
    //         <br />
    //         <button type="submit">Save</button>
    //     </form>
    // );
}

