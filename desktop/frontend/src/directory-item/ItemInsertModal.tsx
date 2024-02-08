import {Button, Flex, Form, Input, message, Modal} from 'antd';
import {storagedata} from "../../wailsjs/go/models.js";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core";
import { useTranslation } from 'react-i18next';
import {genAscRankId} from "../utils";
import {DtoJsonFirst, LoadedItemsUpdate} from "../../wailsjs/go/main/App";
import TextArea from 'antd/es/input/TextArea';
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
    const {t} = useTranslation()

    // 当input文本更新时，实时更新当前操作的密码项数据
    const onChangeHandler = (targetKey, value) => {
        tmpCurrentInsertItem[targetKey]=value
    }
    const onFinish = () => {
        // 判断是否已有此密码项名称
        let ds:any = PassDtoReceived.loadedItems.data;
        let exited = ds.some(item => item.name === tmpCurrentInsertItem.name.trim()&&item.category_id==modalDisplayData.cid)
        if (exited){
            message.warning(t('dataExitedTips'))
            return
        }
        // 生成id
        const gid = genAscRankId();
        const c = {
            name: tmpCurrentInsertItem.name,
            account_name:  tmpCurrentInsertItem.account_name,
            password:  tmpCurrentInsertItem.password,
            site:  tmpCurrentInsertItem.site,
            remark:  tmpCurrentInsertItem.remark,
            id:  gid,
            category_id: modalDisplayData.cid,
        };
        console.log("密码项：：", c)
        PassDtoReceived.loadedItems.data.push(c);
        // 传递给Go存储
        LoadedItemsUpdate(PassDtoReceived.loadedItems)
            .then(()=>{
                // 更新渲染 push()函数直接更新能够被监听，无需副本拷贝
                // setPassDtoReceived({...PassDtoReceived});
            })
            .catch((error) =>{
                // 引发错误则撤销
                PassDtoReceived.loadedItems.data.pop();
                // pop需要更新才会被监听到 从而渲染组件
                setPassDtoReceived({...PassDtoReceived});
                message.error(t("dialogShowErrorTitle")+error);
        });
        handleCancel()
    };

    const onFinishFailed = () => {
    };

    const handleCancel = () => {
        // 取消别忘了重置 因为是全局变量 避免下次新增时仍是之前的值贮存
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
                    <TextArea autoSize={{ minRows: 3,maxRows:6}} onChange={(e)=>{onChangeHandler("remark", e.target.value)}}/>
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