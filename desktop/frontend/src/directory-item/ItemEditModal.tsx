import {Button, Flex, Form, Input, message, Modal} from 'antd';
import {storagedata} from "../../wailsjs/go/models.js";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core.js";
import { useTranslation } from 'react-i18next';
import { LoadedItemsUpdate} from "../../wailsjs/go/main/App";
import TextArea from 'antd/es/input/TextArea';
let tmpEditItem:storagedata.Data|any= {
    name: '',
    account_name: '',
    password: '',
    site: '',
    remark: '',
}
let preName = ""

const ItemEditModal = ({isModalOpen, setIsModalOpen, modalDisplayData}) => {
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    const [currentEditInitItem] = useState<storagedata.Data>(modalDisplayData)
    preName = modalDisplayData.name
    tmpEditItem = modalDisplayData
    const {t} = useTranslation()
    // 当input文本更新时，实时更新当前操作的密码项数据
    const onChangeHandler = (targetKey, value) => {
        tmpEditItem[targetKey]=value
    }

    const onFinish = () => {
        let ds:any = PassDtoReceived.loadedItems.data;
        // 判断该归类夹下是否已有相同的密码项名称(但忽略当前设置的和原名称一样的情况)
        let exited = ds.some(item =>item.name === tmpEditItem.name.trim()&&item.category_id===tmpEditItem.category_id)
        if (exited){
            if (preName!==tmpEditItem.name.trim()){
                message.warning(t('dataExitedTips'))
                return
            }
        }
        // 拷贝一个深副本
        let newObj = JSON.parse(JSON.stringify(PassDtoReceived));
        let newItemObj = newObj.loadedItems.data.find(item => item.id === modalDisplayData.id);
        newItemObj.name= tmpEditItem.name.trim();
        newItemObj.account_name = tmpEditItem.account_name;
        newItemObj.password = tmpEditItem.password;
        newItemObj.site = tmpEditItem.site;
        newItemObj.remark = tmpEditItem.remark;
        // 传递给Go存储
        LoadedItemsUpdate(newObj.loadedItems)
            .then(()=>{
                // // 找到当前编辑的密码项进行更新 引用传递直接修改
                // let editItem = ds.find(item => item.id === modalDisplayData.id);
                // // editItem引用指向newItemObj，而newItemObj元素指向newObj数组引用地址
                // editItem = {...newItemObj}
                // 更新渲染
                setPassDtoReceived(newObj);
            })
            .catch((error) =>{
            message.error(t("dialogShowErrorTitle")+error);
        });
        handleCancel()
    };

    const onFinishFailed = () => {
    };

    const handleCancel = () => {
        // 取消别忘了重置全局变量 避免下次编辑时仍是之前的值贮存
        tmpEditItem={
            name: '',
            account_name: '',
            password: '',
            site: '',
            remark: '',
        }
        preName = ""
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
                    initialValue={currentEditInitItem.name}
                    rules={[
                        {
                            required: true,
                            message: t("dataEditNameBlank"),
                        },
                        {
                            type: 'string',
                            max: 40,
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
                    initialValue={currentEditInitItem.account_name}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("account_name", e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label={t("dataEditPwdLabel")}
                    initialValue={currentEditInitItem.password}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("password", e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="site"
                    label={t("dataEditSiteLabel")}
                    initialValue={currentEditInitItem.site}
                >
                    <Input placeholder="" onChange={(e)=>{onChangeHandler("site", e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="remark"
                    label={t("dataEditRemarkLabel")}
                    initialValue={currentEditInitItem.remark}
                >
                    <TextArea autoSize={{ minRows: 3,maxRows:3}} placeholder="" onChange={(e)=>{onChangeHandler("remark", e.target.value)}}/>
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
export default ItemEditModal;