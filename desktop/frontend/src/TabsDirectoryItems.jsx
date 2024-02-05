import {Button, FloatButton, message, Modal, Space} from "antd";
import List from "antd/lib/list";
import {CopyFilled, DeleteFilled, EyeFilled, PlusOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {PassDtoContext} from "./Core";
import {useTranslation} from "react-i18next";
import ItemEditModal from "./directory-item/ItemEditModal";
import ItemInsertModal from "./directory-item/ItemInsertModal";
import {useState} from "react";
import {isNullOrEmpty} from "./utils.js";
import {LoadedItemsUpdate} from "../wailsjs/go/main/App.js";

// 密碼項界面
function TabsDirectoryItems({tabChangeBy, currentCategoryClickedId}) {
    const { PassDtoReceived, setPassDtoReceived } = useContext(PassDtoContext)
    const {t} = useTranslation()
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState({});
    const data = PassDtoReceived.loadedItems.data.filter((item) => item.category_id === currentCategoryClickedId);
    const currentCategory = PassDtoReceived.loadedItems.category.find((c) => c.id=== currentCategoryClickedId);
    let deleteItemClick = (id) =>{
        Modal.confirm({
            title: t("dialogShowInformationTitle"),
            content: t("dataListDeShowConfirm"),
            cancelText: t("dataEditCancelButtonText"),
            okText: t("dataEditOkButtonText"),
            onOk:() => {
                // 移除此密码项
                PassDtoReceived.loadedItems.data =
                    PassDtoReceived.loadedItems.data
                        .filter((item) => item.id !== id || item.category_id !== currentCategoryClickedId)
                // 拷贝副本重新渲染
                setPassDtoReceived({...PassDtoReceived})
                // 传递给Go存储
                LoadedItemsUpdate(PassDtoReceived.loadedItems).catch((error) =>{
                    message.error(t("dialogShowErrorTitle")+error.message);
                });
            }
        });
    };
    // 密码项界面某个密码被点击编辑
    let editItemClick = (id) =>{
        setEditModalOpen(true)
        let ds = PassDtoReceived.loadedItems.data;
        // 找到当前编辑的密码项 find获取的是对象的引用
        let editItem = ds.find(item => item.id === id && item.category_id === currentCategoryClickedId);
        if (isNullOrEmpty(editItem)){
            message.error(t("dialogShowErrorTitle")+"cant find the edit item");
            return
        }
        // 创建一个深拷贝副本
        let copiedItem = JSON.parse(JSON.stringify(editItem));
        setModalDisplayData(copiedItem)
    };

    // 密码项界面某个密码被点击复制
    let copyItemClick = async (id) => {
        let ds = PassDtoReceived.loadedItems.data;
        // 找到当前密码项
        let copyItem = ds.find(item => item.id === id && item.category_id === currentCategoryClickedId);
        let copyStr = t("copyStr", {
            "name": copyItem.name,
            "remark": copyItem.remark,
            "site": copyItem.site,
            "password": copyItem.password,
            "account_name": copyItem.account_name
        })
        try {
            await navigator.clipboard.writeText(copyStr);
            message.success(t("copyClipboardDone"));
        } catch (err) {
            message.error(t("dialogShowErrorTitle")+err);
        }
    };

    // 添加一个密码项到当前归类夹
    let addItem= () =>{
        setInsertModalOpen(true)
        setModalDisplayData({
            "cid": currentCategoryClickedId,
        })
    };

    return(
        <>
            {/*按钮模态框，点击时显示*/}
            {insertModalOpen? <ItemInsertModal isModalOpen={insertModalOpen} setIsModalOpen={setInsertModalOpen} modalDisplayData={modalDisplayData}/>:null}
            {editModalOpen? <ItemEditModal isModalOpen={editModalOpen} setIsModalOpen={setEditModalOpen} modalDisplayData={modalDisplayData}/>:null}

            {/* 此按钮为本组件 覆盖 首页归类夹界面的"添加归类夹"按钮 点击时会显示归类夹界面*/}
            <FloatButton onClick={()=>{tabChangeBy("1")}} size="small" style={{ right: 70,top:3 }}
                         type="default" shape="circle" icon={<UnorderedListOutlined />}  />
            {/* 此按钮为本组件添加密码项按钮*/}
            <FloatButton onClick={()=>{addItem()}} size="small" style={{ right: 116,top:3 }}
                         type="default" shape="circle" icon={<PlusOutlined />}  />
            <div style={{textAlign:"start",paddingLeft:"20px"}}>
                <h4 style={{color:"gray"}}>{currentCategory.name}</h4>
            </div>
            <List
                itemLayout="horizontal"
                locale={{emptyText: t("categoryNoItems")}}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        style={{ backgroundColor: "white", marginBottom: 20 }}
                        actions={[
                            <Button className="delItemBtn" onClick={()=>{deleteItemClick(item.id)}} icon={<DeleteFilled />}/>,
                            <Button  onClick={()=>{copyItemClick(item.id)}} icon={<CopyFilled />}/>,
                            <Button onClick={()=>{editItemClick(item.id)}} icon={<EyeFilled />} />]
                        }>
                        <List.Item.Meta
                            title={ <a onClick={()=>{editItemClick(item.id)}}>{item.name}</a> }
                            description={item.description}
                        />
                    </List.Item>
                )}
            />

        </>
    )
}
export default TabsDirectoryItems