import {Button, message, Modal, Space, Table} from "antd";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {PassDtoContext} from "./Core";
import {CopyFilled} from "@ant-design/icons";

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
    let tmpValue = modalDisplayData.toLowerCase()
    // 关键字匹配过滤密码项
    tmpDataSource = PassDtoReceived.loadedItems.data.filter((d)=>
        d.name.toLowerCase().includes(tmpValue)||
        d.site.toLowerCase().includes(tmpValue)||
        d.remark.toLowerCase().includes(tmpValue)||
        d.password.toLowerCase().includes(tmpValue)||
        d.account_name.toLowerCase().includes(tmpValue)
    )
    // 因为data数组没有key键，而react渲染列表需要指定每个元素有key来标识唯一，所以在基础上追加key键值对
    // 以及追加所属的归类夹名称
    dataSource = tmpDataSource.map((d,i)=>{
        return {
            ...d,
            key:i,
            _category_name:PassDtoReceived.loadedItems.category.find(c=>c.id===d.category_id).name
        }
    })

    const columns = [
        // 密码项所属归类夹名称
        {
            title: t("SearchDataResultHeaderVDataCategoryName"),
            dataIndex: '_category_name',
            key: '_category_name',
            width: 140,
            ellipsis: true,
            // 数据单元格的渲染函数，参数分别为当前行的值，当前行数据，行索引
            render: (title, item) => (
                <span style={{color:"saddlebrown"}}>{title}</span>
            ),
        },
        // 密码项名称
        {
            title: t("SearchDataResultHeaderVDataName"),
            dataIndex: 'name',
            key: 'name',
            width: 110,
            ellipsis: true,
            // 数据单元格的渲染函数，参数分别为当前行的值，当前行数据，行索引
            render: (title, item) => (
                <span style={{color:"green"}}>{title}</span>
            ),
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
            dataIndex: 'password',
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
            width: 145,
            ellipsis: true,
        },
        {
            title: '-',
            key: 'action',
            render: (_, item) => (
                <Button onClick={()=>{copyItemClick(item.id, item.category_id)}} icon={<CopyFilled />}/>
            ),
        },
    ];

    // 点击了复制按钮 复制该条密码项
    async function copyItemClick(itemId, category_id) {
        // 根据id找到密码项
        let copyItem = dataSource.find(item => item.id === itemId && item.category_id === category_id);
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
            message.error(t("dialogShowErrorTitle") + err);
        }
    }

    return (
        <>
            <Modal cancelButtonProps={{ style: { display: 'none' } }}
                   okButtonProps={{ style: { backgroundColor:"green" } }}
                   width={820}
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