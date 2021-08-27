import { Menu } from "antd";
import React from "react";
import { MenuItemsType } from "../../../pages/AppMainPage";

type MenuItem = {
  icon: JSX.Element
  title: string
}
export type PropsType = {
  menuItems: MenuItemsType
  selectedKey: string
  changeSelectedKey: (event: { key: string; }) => void
}
export const TopicMenu: React.FC<PropsType> = ({ menuItems, selectedKey, changeSelectedKey }) => {
  const styledTopics: Array<JSX.Element> = [];
  menuItems.forEach((menuItem: MenuItem, index: number) =>
    styledTopics.push(
      <Menu.Item
        icon={menuItem?.icon}
        key={index}
        onClick={changeSelectedKey}>
        {menuItem.title}
      </Menu.Item>
    )
  );

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      className='menu-container'
    >
      {styledTopics}
    </Menu>
  );
}