import {Modal} from "antd";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {PassDtoContext} from "../Core";

const DirectoryInfoModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const {t} = useTranslation()
    const { PassDtoReceived, setPassDtoReceived } = useContext(PassDtoContext)
    const count = PassDtoReceived.loadedItems.data.filter((d) => d.category_id === modalDisplayData.id).length

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal cancelButtonProps={{ style: { display: 'none' } }} okText={t("directoryInfoOkText")} centered={true} maskClosable={false} closeIcon={null}
                   title={t("dialogShowInformationTitle")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{t("directoryInfoItemsCount", {"count":count})}</p>
            </Modal>
        </>
    );
};
export default DirectoryInfoModal;