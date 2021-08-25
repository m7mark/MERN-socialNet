import React from "react";
import { Layout } from "antd";

export const SideBar = ({ menu } : any) => {
    return (
        <Layout.Sider
            className="menu-sidebar"
            breakpoint={"md"}
            theme="dark"
            collapsedWidth={0}
            trigger={null}
        >
            {menu}
        </Layout.Sider>
    );
};