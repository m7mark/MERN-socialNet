import Post from './Post/Post';
import React from 'react';
import { actions } from '../../../redux/profile-reducer';
import {
  Avatar,
  Form,
  Input,
  List,
  Space
} from 'antd';
import { Col, Row } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PostData } from '../../../types/types';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/store';

const { Title } = Typography;
const { Search } = Input;

export type StatePropsType = {
  postData: Array<PostData>
}
export type DispatchPropsType = {
  addNewPostBody: (newPostText: string) => void
}
type AddPostFormValuesType = {
  newPostBodyText: string
}
export const MyPosts: React.FC = () => {
  return (
    <div style={{ marginTop: '30px' }}>
      <AddPostForm />
      <Row>
        <Col lg={18} xs={24} sm={24}>
          <PostsList />
        </Col>
      </Row>
    </div>
  )
}


const AddPostForm: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onSearch = () => { form.submit() }
  const onFinish = (values: AddPostFormValuesType) => {
    dispatch(actions.addNewPostBody(values.newPostBodyText))
    form.resetFields()
  }

  return (
    <Form
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
          onSearch={onSearch}
        />
      </Form.Item>
    </Form>
  )
}

const PostsList: React.FC = () => {
  const avaUrl = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  const postListData = useSelector((state: AppStateType) => state.profilePage.postData);
  const listData = [];
  for (let i = 0; i < postListData.length; i++) {
    listData.push({
      title: `ant design part ${i}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: { ...postListData },
    });
  }

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={postListData}
      footer={
        <div>
          <b>Like</b> Dymych
        </div>
      }
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon={StarOutlined} text={138 - item.likesCount} key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text={item.likesCount} key="list-vertical-like-o" />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={avaUrl} />}
            title={`${item.id} is a number`}
          />
          {item.message}
        </List.Item>
      )}
    />
  )
}