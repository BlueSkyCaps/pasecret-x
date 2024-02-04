import {DeleteOutlined, EditOutlined, InfoOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import {useState} from "react";
import DirectoryInfoModal from "./DirectoryInfoModal.jsx";
import DirectoryEditModal from "./DirectoryEditModal.js";
import {useContext} from "react";
import {PassDtoContext} from "../Core.js";
import {storagedata} from "../../wailsjs/go/models.js";
import {Col, message, Modal} from "antd";
// 解决Card组件无法正常导入：import {Card} from "antd";
import Card from "antd/lib/card/Card"
import {useTranslation} from "react-i18next";
import {LoadedItemsUpdate} from "../../wailsjs/go/main/App";

function DirectoryListRender({tabChangeByDirectoryClick}) {
    const { t } = useTranslation();
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    // card底部icon按钮被点击会触发整个card被点击，因此设一个flag来控制：如果点击了icon就不触发后续的card被点击事件
    let oneIconClickedFlag = false
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [delModalOpen, setDelModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState({});

    function oneInfoIconClickHandler(id) {
        oneIconClickedFlag = true;
        if (oneIconClickedFlag){
            alert("You clicked on oneInfoIconClickHandler "+ id)
            setInfoModalOpen(true)
            setModalDisplayData({
                title: "Info",
                okText: "确定",
                content: "This is the info modal"
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
                    let newCs = PassDtoReceived.loadedItems.category.filter((item) => item.id !== id)
                    PassDtoReceived.loadedItems.category = newCs
                    // 拷贝副本重新渲染
                    setPassDtoReceived({...PassDtoReceived})
                    // 传递给Go存储
                    LoadedItemsUpdate(PassDtoReceived.loadedItems).catch((error) =>{
                        message.error(t("dialogShowErrorTitle")+error.message);
                    });
                }
            });
        }
    }
    function oneDirectoryClickHandler() {
        if (oneIconClickedFlag){
            oneIconClickedFlag = false;
            return
        }
        alert("You clicked on oneDirectoryClickHandler")
        // 调用父组件传来的方法 将tabs key激活为"3" 显示密码项界面
        tabChangeByDirectoryClick("3")

    }

    return(
        <>
            {/*按钮模态框，点击时显示*/}
            {infoModalOpen? <DirectoryInfoModal isModalOpen={infoModalOpen} setIsModalOpen={setInfoModalOpen} modalDisplayData={modalDisplayData}/>:null}
            {editModalOpen? <DirectoryEditModal isModalOpen={editModalOpen} setIsModalOpen={setEditModalOpen} modalDisplayData={modalDisplayData}/>:null}
            {
                /*如果一个 row 中的 col 总和超过 24，那么多余的 col 会作为一个整体另起一行排列。 span={8} 3个一行凑够24*/
                PassDtoReceived.loadedItems.category.map(b=>(
                    <Col key={b.id} span={8}>
                        <Card
                            style={{ width: 320 }}
                            hoverable={true}
                            onClick={() => {oneDirectoryClickHandler()}}
                            actions={[
                                <InfoOutlined  key="info" onClick={()=>oneInfoIconClickHandler(`${b.id}`)}/>,
                                <EditOutlined key="edit" onClick={()=>oneEditIconClickHandler(`${b.id}`)}/>,
                                <DeleteOutlined key="delete" onClick={()=>oneDeleteIconClickHandler(`${b.id}`)}/>,
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