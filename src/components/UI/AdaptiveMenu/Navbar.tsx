import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
// import logo from "../../../assets/userIcon.png";
import { AppHeader } from "../Header/AppHeader";

export const NavBar: React.FC<{ menu: JSX.Element }> = ({ menu }) => {
    const [visible, setVisible] = useState(false);
    return (
        <nav className="menu-navbar">
            <Button
                className="menu"
                type="default"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
            />
            <Drawer
                drawerStyle={{ backgroundColor: '#001529' }}
                maskClosable
                title="Menu"
                placement="left"
                // onClick={() => setVisible(false)}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                {menu}
            </Drawer>
            {/* <a href="/"><img src={logo} className="menu-navbar-logo" alt="logo" /></a> */}
            <div style={{ marginRight: '20px' }}><AppHeader /></div>
        </nav >
    );
};