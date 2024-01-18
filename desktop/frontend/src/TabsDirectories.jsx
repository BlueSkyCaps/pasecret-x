import {Avatar, Card, Col, Row} from "antd";
import {DeleteOutlined, EditOutlined, EllipsisOutlined, InfoOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import DirectoryListRender from "./com/DirectoryListRender.jsx";

// 接受父组件传递的tabChangeByDirectoryClick回调函数 再次传给子组件DirectoryListRender
// 当点击了某个归类夹 将tabs key激活为3 显示密码项界面
function TabsDirectories({tabChangeByDirectoryClick}) {
    const data = [
        {
            id: '1',
            title: 'John Brown',
            description: 'New York No. 1 Lake Park',
        },
        {
            id: '2',
            title: 'John Brown22',
            description: 'New York No. 1 Lake Park22',
        },
        {
            id: '3',
            title: 'John Brown22',
            description: 'New York No. 1 Lake Park22',
        },
    ]
  return (
    <div>
        {/*如果一个 row 中的 col 总和超过 24，那么多余的 col 会作为一个整体另起一行排列。 span={8} 3个一行凑够24*/}
        <Row gutter={[16,16]}>
            <DirectoryListRender ds={data} tabChangeByDirectoryClick={tabChangeByDirectoryClick}/>
        </Row>

      {/* Add more components and content here */}
    </div>
  );
}

export default TabsDirectories