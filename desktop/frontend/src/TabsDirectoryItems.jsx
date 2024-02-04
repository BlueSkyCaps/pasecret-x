import {Button, FloatButton} from "antd";
import List from "antd/lib/list";
import {CopyFilled, DeleteFilled, EyeFilled, PlusOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {PassDtoContext} from "./Core.tsx";
import {useTranslation} from "react-i18next";
import ItemEditModal from "./directory-item/ItemEditModal";
import ItemInsertModal from "./directory-item/ItemInsertModal";
import {useState} from "react";

// 密碼項界面
function TabsDirectoryItems({tabChangeBy, currentCategoryClickedId}) {
    const { PassDtoReceived, setPassDtoReceived } = useContext(PassDtoContext)
    const {t} = useTranslation()
    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState({});
    const data = PassDtoReceived.loadedItems.data.filter((item) => item.category_id === currentCategoryClickedId);

    let deleteItemClick = (id) =>{
        console.log("deleteItemClick",id);
    };
    let editItemClick = (id) =>{
        console.log("editItemClick",id);
    };
    let copyItemClick = (id) =>{
        console.log("copyItemClick",id);
    };
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
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />

        </>
    )
}
export default TabsDirectoryItems