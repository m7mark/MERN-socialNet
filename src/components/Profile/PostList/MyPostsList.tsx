import React from 'react';
import { AppStateType } from '../../../redux/store';
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export const MyPostsList: React.FC = () => {
  const avaUrl = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  const postListData = useSelector((state: AppStateType) => state.profilePage.postData);
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
      pagination={{ pageSize: 3 }}
      dataSource={postListData}
      footer={<div>
        <b>Like</b> Dymych
      </div>}
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
            title={`${item.id} is a number`} />
          {item.message}
        </List.Item>
      )} />
  );
};
