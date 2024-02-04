import {useContext, useEffect, useState} from 'react';
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
import {useTranslation} from "react-i18next";
import {PassDtoContext} from "./Core";
import DirectoryInsertModal from "./directory/DirectoryInsertModal.js"
import { storagedata } from '../wailsjs/go/models';

function App() {
    // const { PassDtoReceived, setPassDtoReceived } : { PassDtoReceived: storagedata.PassDto, setPassDtoReceived: any }= useContext(PassDtoContext);
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState({});
    const [currentCategoryClickedId, setCurrentCategoryClickedId] = useState(null);
    const { t } = useTranslation();
    // tabsInit Tabs标签组件用于初始化此组件界面，更改activeKey来动态切换当前显示的Tab标签
    function tabsInit(){
        return [
            {
                // 归类夹界面
                key: "1",
                children: <TabsDirectories tabChangeBy={tabChangeBy}/>,
            },
            {
                // 设置界面
                key: "2",
                children: <TabsSetting/>,
            },
            {
                // 归类夹中的密码项界面
                key: "3",
                children: <TabsDirectoryItems tabChangeBy={tabChangeBy} currentCategoryClickedId={currentCategoryClickedId}/>,
            }
        ]
    }
    const [activeKey, setActiveKey] = useState('1');
    const [homeBtnShow, setHomeBtnShow] = useState(false);
    function onSearch() {
        alert(t("SearchWindowTitle"))
    }
    // 点击添加归类夹按钮，显示模态
    function addDirect(){
        setInsertModalOpen(true)
    }
    function tabChange(key) {
        setActiveKey(key)
        if (key === "2"){
            setHomeBtnShow(true)
        }else {
            setHomeBtnShow(false)
        }

    }
    // 用于给子组件进行调用的回调函数 将tabs key激活 切换指定界面，如密码项界面、归类夹界面
    function tabChangeBy(...key) {
        setActiveKey(key[0])
        // 若是点击了某归类夹则是显示密码项界面，更新当前操作的归类夹id，后续由TabsDirectoryItems密码项组件处理渲染
        if (key[0] === "3"){
            setCurrentCategoryClickedId(key[1])
        }
    }

    return (
        <div>
            {/*添加归类夹模态框，点击时显示*/}
            {insertModalOpen? <DirectoryInsertModal isModalOpen={insertModalOpen} setIsModalOpen={setInsertModalOpen} modalDisplayData={modalDisplayData}/>:null}
            {/*打开归类夹界面或者设置界面的按钮*/}
            {homeBtnShow?
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
                    <div style={{height:"32px"}} hidden={homeBtnShow}>
                        {/*添加归类夹的按钮 和搜索框*/}
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
