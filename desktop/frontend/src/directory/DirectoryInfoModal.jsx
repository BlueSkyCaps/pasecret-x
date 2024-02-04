import {Modal} from "antd";

const DirectoryInfoModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal cancelButtonProps={{ style: { display: 'none' } }} okText={modalDisplayData.okText} centered={true} maskClosable={false} closeIcon={null}
                   title={modalDisplayData.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{modalDisplayData.content}</p>
            </Modal>
        </>
    );
};
export default DirectoryInfoModal;