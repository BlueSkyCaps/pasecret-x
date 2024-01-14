import {useState} from 'react';
import {Greet} from "../wailsjs/go/main/App";
import {FloatButton, Layout, Tabs} from "antd";
import {
    PlusOutlined,
    SettingOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import Home from "./Home.jsx";
import Setting from "./Setting.jsx";
import {Content, Header} from "antd/es/layout/layout.js";
import Search from "antd/es/input/Search.js";

function tabsInit(){
    return [
        {
            key: "1",
            children: <Home />,
        },
        {
            key: "2",
            children: <Setting/>,
        }
    ]
}


function App() {
    const [activeKey, setActiveKey] = useState('1');
    const [homeBtnHidden, setHomeBtnHidden] = useState(false);
    function onSearch() {
        alert("搜索")
    }
    function tabChange(key) {
        setActiveKey(key)
        if (key === "2"){
            setHomeBtnHidden(true)
        }else {
            setHomeBtnHidden(false)
        }
    }
    return (
        <div>
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
                        <FloatButton onClick={()=>{tabChange("1")}} size="small" style={{ right: 70,top:3 }}
                                     type="default" shape="circle" icon={<PlusOutlined />}  />
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
