import {Modal, Space, Table} from "antd";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {PassDtoContext} from "./Core";

const SearchItemsModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const {t} = useTranslation()
    const { PassDtoReceived, setPassDtoReceived } = useContext(PassDtoContext)

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let dataSource = []
    let tmpDataSource = []
    alert(modalDisplayData)
    let tmpValue = modalDisplayData.toLowerCase()
    // 关键字匹配过滤密码项
    tmpDataSource = PassDtoReceived.loadedItems.data.filter((d)=>
        d.name.toLowerCase().includes(tmpValue)||
        d.site.toLowerCase().includes(tmpValue)||
        d.remark.toLowerCase().includes(tmpValue)||
        d.password.toLowerCase().includes(tmpValue)||
        d.account_name.toLowerCase().includes(tmpValue)
    )
    // 因为data数组没有key键，而react渲染列表需要指定每个元素有key来标识唯一，所以在基础上追加key键值对仅此而已
    dataSource = tmpDataSource.map((d,i)=>{
        return {
            ...d,
            key:i
        }
    })

    const columns = [
        {
            title: t("SearchDataResultHeaderVDataName"),
            dataIndex: 'name',
            key: 'name',
            width: 120,
            ellipsis: true,
        },
        {
            title: t("SearchDataResultHeaderVDataAccountName"),
            dataIndex: 'account_name',
            key: 'account_name',
            width: 100,
            ellipsis: true,
        },
        {
            title: t("SearchDataResultHeaderVDataPassword"),
            dataIndex: t(""),
            key: 'password',
            width: 100,
            ellipsis: true,
        },
        {
            title: t("SearchDataResultHeaderVDataSite"),
            dataIndex: 'site',
            key: 'site',
            width: 100,
            ellipsis: true,
        },
        {
            title: t("SearchDataResultHeaderVDataRemark"),
            dataIndex: 'remark',
            key: 'remark',
            width: 150,
            ellipsis: true,
        },
        {
            title: '-',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=>{alert( record.name)}}>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Modal cancelButtonProps={{ style: { display: 'none' } }}
                   okButtonProps={{ style: { backgroundColor:"green" } }}
                   width={700}
                   okText={t("SearchWindowOkText")} centered={true} maskClosable={false} closeIcon={null}
                   title={t("SearchWindowTitle")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Table dataSource={dataSource} columns={columns}
                       pagination={false}
                       scroll={{
                           y: 240,
                       }}
                />
            </Modal>
        </>
    );
};
export default SearchItemsModal;