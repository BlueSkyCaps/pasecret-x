import {DeleteOutlined, EditOutlined, InfoOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import {useState} from "react";
import DirectoryInfoModal from "./DirectoryInfoModal.jsx";
import DirectoryEditModal from "./DirectoryEditModal.js";
import {useContext} from "react";
import {PassDtoContext} from "../Core.js";
import {storagedata} from "../../wailsjs/go/models.js";
import {Col} from "antd";
// 解决Card组件无法正常导入：import {Card} from "antd";
import Card from "antd/lib/card/Card"
import {useTranslation} from "react-i18next";
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

    function oneEditIconClickHandler(id) {
        oneIconClickedFlag = true;
        if (oneIconClickedFlag){
            alert("You clicked on oneEditIconClickHandler "+ id)
            setEditModalOpen(true)
            setModalDisplayData({
                title: t("categoryEditWindowTitle"),
                okText: t("categoryInsetOkButtonText"),
                cancelText: t("categoryInsetCancelButtonText"),
            })
        }
    }

    function oneDeleteIconClickHandler(id) {
        oneIconClickedFlag = true;
        if (oneIconClickedFlag){
            alert("You clicked on oneDeleteIconClickHandler "+ id)
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