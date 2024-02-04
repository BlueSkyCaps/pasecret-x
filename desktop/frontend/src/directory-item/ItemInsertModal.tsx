import {Button, Flex, Form, Input, message, Modal} from 'antd';
import {storagedata} from "../../wailsjs/go/models.js";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core.js";
import { useTranslation } from 'react-i18next';
import {genAscRankId} from "../utils";
import {DtoJsonFirst, LoadedItemsUpdate} from "../../wailsjs/go/main/App";
let tmpCurrentInsertItem:storagedata.Data= {
    name: '',
    account_name: '',
    password: '',
    site: '',
    remark: '',
    id: '',
    category_id: ''
}
const ItemInsertModal = ({isModalOpen, setIsModalOpen, modalDisplayData}) => {
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    const [currentInsertItem,setCurrentInsertItem] = useState<storagedata.Data>(null)
    const {t} = useTranslation()

    // 当input文本更新时，实时更新当前操作的密码项数据
    const onChangeHandler = (targetKey, value) => {
        tmpCurrentInsertItem[targetKey]=value
        // 用临时全局变量更新当前操作的密码项数据
        setCurrentInsertItem(tmpCurrentInsertItem)
    }

    const onFinish = () => {
        // 生成id
        const gid = genAscRankId();
        const c = {
            name: currentInsertItem.name,
            account_name:  currentInsertItem.account_name,
            password:  currentInsertItem.password,
            site:  currentInsertItem.site,
            remark:  currentInsertItem.remark,
            id:  gid,
            category_id: modalDisplayData.cid,
        };
        console.log("密码项：：", c)
        // 拷贝为副本更新，否则无法监听到改变而渲染
        let newObj = {...PassDtoReceived};
        newObj.loadedItems.data.push(c);
        // 更新渲染
        setPassDtoReceived(newObj);
        // 传递给Go存储
        LoadedItemsUpdate(PassDtoReceived.loadedItems).catch((error) =>{
            message.error(t("dialogShowErrorTitle")+error.message);
        });
        handleCancel()
    };
    const onFinishFailed = () => {
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        // 取消别忘了重置 因为是全局变量 避免下次编辑时仍是之前的值贮存
        tmpCurrentInsertItem= {
            name: '',
            account_name: '',
            password: '',
            site: '',
            remark: '',
            id: '',
            category_id: ''
        }
        setIsModalOpen(false);
    }

    return (
        <Modal destroyOnClose={true} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }} centered={true} maskClosable={false} closeIcon={null}
               title={t("dataInsertWindowTitle")} open={isModalOpen} >
            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label={t("dataEditNameLabel")}
                    rules={[
                        {
                            required: true,
                            message: t("dataEditNameBlank"),
                        },
                        {
                            type: 'string',
                            whitespace:true,
                            message: t("dataEditNameBlank"),
                        },
                    ]}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("name", e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="account_name"
                    label={t("dataEditDynamicByUsualAccountNameLabel")}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("account_name", e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label={t("dataEditPwdLabel")}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("password", e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="site"
                    label={t("dataEditSiteLabel")}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("site", e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="remark"
                    label={t("dataEditRemarkLabel")}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("remark", e.target.value)}}/>
                </Form.Item>
                <Form.Item>
                    <Flex  gap="small" justify="end" >
                        <Button onClick={handleCancel}>
                            { t("categoryInsetCancelButtonText")}
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {t("categoryInsetOkButtonText")}
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default ItemInsertModal;