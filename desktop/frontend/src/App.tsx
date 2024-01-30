import {useState} from 'react';
import {FloatButton, Layout, Tabs} from "antd";
import {
    FolderAddOutlined,
    SettingOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import TabsDirectories from "./TabsDirectories";
import TabsSetting from "./TabsSetting.jsx";
import {Content, Header} from "antd/es/layout/layout.js";
import Search from "antd/es/input/Search.js";
import TabsDirectoryItems from "./TabsDirectoryItems.jsx";
import {DtoJsonFirst} from "../wailsjs/go/main/App.js";


function App() {
    let [PassDtoReceived,setPassDtoReceived] = useState(null);
    DtoJsonFirst().then((result) => {
        setPassDtoReceived(result)
    });

    function tabsInit(){
        return [
            {
                // 归类夹界面
                key: "1",
                children: <TabsDirectories data={PassDtoReceived} tabChangeByDirectoryClick={tabChangeBy}/>,
            },
            {
                // 设置界面
                key: "2",
                children: <TabsSetting/>,
            },
            {
                // 归类夹中的密码项界面
                key: "3",
                children: <TabsDirectoryItems tabChangeByDirectoryItemsIconClick={tabChangeBy}/>,
            }
        ]
    }
    const [activeKey, setActiveKey] = useState('1');
    const [homeBtnHidden, setHomeBtnHidden] = useState(false);
    function onSearch() {
        alert("搜索")
    }
    function addDirect(){
        alert("添加归类夹")
    }
    function tabChange(key) {
        setActiveKey(key)
        if (key === "2"){
            setHomeBtnHidden(true)
        }else {
            setHomeBtnHidden(false)
        }
    }
    // 用于给子组件进行调用的回调函数 将tabs key激活 显示指定界面，如密码项界面、归类夹界面
    function tabChangeBy(key) {
        setActiveKey(key)
    }

    return (
        <div>
            {/*打开归类夹界面或者设置界面*/}
            {homeBtnHidden?
                <FloatButton onClick={()=>{tabChange("1")}} size="small" style={{ right: 24,top:3 }}
                                         type="default" shape="circle" icon={<UnorderedListOutlined />}  />:
                <FloatButton onClick={()=>{tabChange("2")}} size="small" style={{ right:24, top:3 }}
                                        type="default" shape="circle" icon={<SettingOutlined/>}  />}
            <Layout>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        height: '43px',
                        display: 'flex',
                        padding:"0px",
                        alignItems: 'center',
                        backgroundColor:"white"
                    }}
                >
                    <div style={{height:"32px"}} hidden={homeBtnHidden}>
                        <FloatButton onClick={addDirect} size="small" style={{ right: 70,top:3 }}
                                     type="default" shape="circle" icon={<FolderAddOutlined />}  />
                        <Search
                            placeholder="搜索密码项"
                            allowClear
                            onSearch={onSearch}
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                </Header>
                <Content >
                    <Tabs
                        activeKey={activeKey}
                        size="small"
                        type="line"
                        tabPosition="bottom"
                        items={tabsInit()}
                    />
                </Content>
            </Layout>
        </div>
    )
}

export default App
