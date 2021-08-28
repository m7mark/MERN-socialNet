import React, { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
// import logo from "../../../assets/userIcon.png";
import { AppHeader } from "../Header/AppHeader";

export const NavBar: React.FC<{ menu: JSX.Element, selectedKey: string }> = ({ menu, selectedKey }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(false)
    }, [selectedKey]);
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