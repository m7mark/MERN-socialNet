import React from 'react';
import { Col, Row } from 'antd';
import { MyPostsAddPostForm } from './MyPostsAddPostForm';
import { MyPostsList } from './MyPostsList';

export const MyPosts: React.FC = () => {
  return (
    <div style={{ marginTop: '30px' }}>
      <MyPostsAddPostForm />
      <Row>
        <Col lg={18} xs={24} sm={24}>
          <MyPostsList />
        </Col>
      </Row>
    </div>
  )
}



