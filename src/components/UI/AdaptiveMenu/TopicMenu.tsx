import { Menu } from "antd";

export const TopicMenu = ({ topics, selectedKey, changeSelectedKey }: any) => {
  const styledTopics: any = [];
  //@ts-ignore
  topics.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item key={index} onClick={changeSelectedKey}>
        {topic}
      </Menu.Item>
    )
  );

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      
      style={{ paddingTop: '26px' }}
    >
      {styledTopics}
    </Menu>
  );
}