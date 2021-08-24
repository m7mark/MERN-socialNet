import React from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <Loading3QuartersOutlined style={{ fontSize: 54, color: '#001529' }} spin />
export const AntPreloader: React.FC = () => {
    return (
        <Spin indicator={antIcon} />
    )
}