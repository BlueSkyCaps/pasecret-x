import {DeleteOutlined, EditOutlined, InfoOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import {useContext, useState} from "react";
import DirectoryInfoModal from "./DirectoryInfoModal.jsx";
import DirectoryEditModal from "./DirectoryEditModal.js";
import {PassDtoContext} from "../Core.js";
import {storagedata} from "../../wailsjs/go/models.js";
import {Col, message, Modal} from "antd";
// 解决Card组件无法正常导入：import {Card} from "antd";
import Card from "antd/lib/card/Card"
import {useTranslation} from "react-i18next";
import {LoadedItemsUpdate} from "../../wailsjs/go/main/App";

function DirectoryListRender({tabChangeBy}) {
    const { t } = useTranslation();
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    // card底部icon按钮被点击会触发整个card被点击，因此设一个flag来控制：如果点击了icon就不触发后续的card被点击事件
    let oneIconClickedFlag = false
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState({});

    function oneInfoIconClickHandler(id) {
        oneIconClickedFlag = true;
        if (oneIconClickedFlag){
            setInfoModalOpen(true)
            setModalDisplayData({
                id: id,
            })
        }
    }

    // 判断当前操作的归类夹元素是否允许被删除或编辑
    function cannotEditAndHandler(id) {
        // 找到当前的归类夹元素
        const cs:any = PassDtoReceived.loadedItems.category
        let c = cs.find((item) => item.id ===id);
        if (!c.removeable&&!c.renameable){
            return [true, null]
        }
        return [false,c]
    }

    // 某个归类夹的编辑按钮被点击时
    // 需要传递该归类夹的id，以便在编辑时可以修改该id对应的归类夹信息
    function oneEditIconClickHandler(id) {
        oneIconClickedFlag = true;
        if (oneIconClickedFlag){
            if (cannotEditAndHandler(id)[0]){
                message.info(t("categoryCanNotEditTips"))
                return
            }
            setEditModalOpen(true)
            setModalDisplayData({
                id: id,
            })
        }
    }
    // 某个归类夹的删除按钮被点击时
    function oneDeleteIconClickHandler(id) {
        oneIconClickedFlag = true;
        if (oneIconClickedFlag){
            const [cannot, c] = cannotEditAndHandler(id)
            if (cannot){
                message.info(t("categoryCanNotDelTips"))
                return
            }
            Modal.confirm({
                title: t("dialogShowInformationTitle"),
                content: t("categoryDelConfirmMsg", {name:c.name}),
                cancelText: t("categoryInsetCancelButtonText"),
                okText: t("categoryInsetOkButtonText"),
                onOk:() => {
                    // 拷贝一个深副本
                    let nweObj = JSON.parse(JSON.stringify(PassDtoReceived));
                    nweObj.loadedItems.category = nweObj.loadedItems.category.filter((item) => item.id !== id)
                    // 继续移除归类夹所属密码项
                    nweObj.loadedItems.data = nweObj.loadedItems.data.filter((item) => item.category_id !== id)
                    // 传递给Go存储
                    LoadedItemsUpdate(nweObj.loadedItems)
                        .then(()=>{
                            // 重新渲染
                            setPassDtoReceived(nweObj)
                        })
                        .catch((error) =>{
                            message.error(t("dialogShowErrorTitle")+error);
                    });
                }
            });
        }
    }
    // 某个归类夹被点击时 开始显示密码项标签Tab界面 渲染当前归类夹下的密码项数据
    function oneDirectoryClickHandler(id) {
        if (oneIconClickedFlag){
            oneIconClickedFlag = false;
            return
        }
        // 调用父组件传来的方法 将tabs key激活为"3" 显示密码项界面
        // 并且传递当前点击的归类夹id
        tabChangeBy("3", id)
    }

    return(
        <>
            {/*按钮模态框，点击时显示, 别忘了要传递isModalOpen <Modal open={isModalOpen===true}/>才能显示模态*/}
            {infoModalOpen? <DirectoryInfoModal isModalOpen={infoModalOpen} setIsModalOpen={setInfoModalOpen} modalDisplayData={modalDisplayData}/>:null}
            {editModalOpen? <DirectoryEditModal isModalOpen={editModalOpen} setIsModalOpen={setEditModalOpen} modalDisplayData={modalDisplayData}/>:null}
            {
                /*如果一个 row 中的 col 总和超过 24，那么多余的 col 会作为一个整体另起一行排列。 span={8} 3个一行凑够24*/
                PassDtoReceived.loadedItems.category.map(b=>(
                    <Col key={b.id} span={8}>
                        <Card
                            hoverable={true}
                            onClick={() => {oneDirectoryClickHandler(b.id)}}
                            actions={[
                                <InfoOutlined  key="info" onClick={()=>oneInfoIconClickHandler(b.id)}/>,
                                <EditOutlined key="edit" onClick={()=>oneEditIconClickHandler(b.id)}/>,
                                <DeleteOutlined key="delete" onClick={()=>oneDeleteIconClickHandler(b.id)}/>,
                            ]}>
                            <Meta
                                title={b.name}
                                description={b.description}
                            />
                        </Card>
                    </Col>
                ))
            }
        </>
    )
}
export default DirectoryListRender