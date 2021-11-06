import React from 'react';
import { actions } from '../../redux/profile-reducer';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
const { Search } = Input;

export const MyPostsAddPostForm: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const onSearch = () => { form.submit(); };
    const onFinish = (values: { newPostBodyText: string }) => {
        dispatch(actions.addNewPostBody(values.newPostBodyText));
        form.resetFields();
    };

    return (
        <Form
            size='large'
            form={form}
            name="addNewPost"
            onFinish={onFinish}
        >
            <Form.Item
                name="newPostBodyText"
                style={{ maxInlineSize: '350px' }}
                rules={[
                    { required: true, message: 'Please input your Post text!' },
                ]}
            >
                <Search
                    placeholder="Add new post text"
                    enterButton="Add Post"
                    // size="large"
                    onSearch={onSearch} />
            </Form.Item>
        </Form>
    );
};
