import { Layout } from "antd";
import React from "react";

export const SideBar: React.FC<{ menu: JSX.Element }> = ({ menu }) => {
    return (
        <Layout.Sider
            className="menu-sidebar"
            breakpoint={"md"}
            theme="dark"
            collapsedWidth={0}
            trigger={null}
            width='250'
        >
            {menu}
        </Layout.Sider>
    );
};