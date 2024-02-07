import { useState} from 'react';
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
import DirectoryInsertModal from "./directory/DirectoryInsertModal.js"
import SearchItemsModal from "./SearchItemsModal.jsx"
import {isNullOrWhitespace} from "./utils";

function App() {
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [currentCategoryClickedId, setCurrentCategoryClickedId] = useState(null);
    const { t } = useTranslation();
    /* tabsInit Tabs标签组件用于初始化此组件界面，更改activeKey来动态切换当前显示的Tab标签
    注意，应该判断activeKey来动态切换Tabs标签，返回只有对应的单独标签元素组件的数组！
    而不是一次性返回整个Tabs标签组件数组[]！因为这样会出现更新activeKey会导致ant迭代渲染数组中的所有标签组件的问题!
    即使当前显示的标签组件是正确的
    */
    function tabsInit(){
        switch (activeKey) {
            case  "1":
                return [
                    {
                        // 归类夹界面
                        key: "1",
                        children: <TabsDirectories tabChangeBy={tabChangeBy}/>,
                    }]
            case  "2":
                return [{
                    // 设置界面
                    key: "2",
                    children: <TabsSetting/>,
                }]
            case   "3":
                return [
                    {
                        // 归类夹中的密码项界面
                        key: "3",
                        children: <TabsDirectoryItems tabChangeBy={tabChangeBy} currentCategoryClickedId={currentCategoryClickedId}/>,
                    }
                ]
        }
    }
    const [activeKey, setActiveKey] = useState('1');
    const [homeBtnShow, setHomeBtnShow] = useState(false);

    // 搜索按钮被点击 显示搜索模态
    function onSearchClicked() {
        if (isNullOrWhitespace(searchValue))
            return
        setModalDisplayData(searchValue)
        setSearchModalOpen(true)
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
            {/*搜索结果模态框，点击搜索按钮显示*/}
            {searchModalOpen? <SearchItemsModal isModalOpen={searchModalOpen} setIsModalOpen={setSearchModalOpen} modalDisplayData={modalDisplayData}/>:null}
            {/*添加归类夹模态框，点击时显示*/}
            {insertModalOpen? <DirectoryInsertModal isModalOpen={insertModalOpen} setIsModalOpen={setInsertModalOpen}/>:null}
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
                            placeholder={t("SearchInputText")}
                            onSearch={onSearchClicked}
                            onChange={(e)=>{setSearchValue(e.target.value)}}
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                </Header>

                <Content>
                    {/*不让tab元素显示滚动条，避免显示模态框时x轴突然显示滚动条 但是其内部元素如TabsDirectories归类夹会动态显示滚动条*/}
                    <div style={{overflowX:"hidden", overflowY:"hidden"}}>
                        <Tabs
                            // 修改tabs背景颜色为白色统一窗口配色，否则它是灰色的
                            style={{backgroundColor:"white"}}
                            // 不显示Bar 这样隐藏多余的bar的icon、一条横线
                            tabBarStyle={{display:"none"}}
                            activeKey={activeKey}
                            size="small"
                            type="line"
                            tabPosition="bottom"
                            // @ts-ignore
                            items={tabsInit()}
                        />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default App
