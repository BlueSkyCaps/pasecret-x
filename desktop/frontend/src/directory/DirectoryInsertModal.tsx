
import {Button, Flex, Form, Input, message, Modal} from 'antd';
import {storagedata} from "../../wailsjs/go/models.js";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core.js";
import { useTranslation } from 'react-i18next';
import {genAscRankId} from "../utils";
import {DtoJsonFirst, LoadedItemsUpdate} from "../../wailsjs/go/main/App";
const DirectoryInsertModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const {t} = useTranslation()
    const onFinish = () => {
        let exited = PassDtoReceived.loadedItems.category.some((item)=>item.name===name.trim())
        if (exited){
            message.warning(t("categoryExitedTips"))
            return
        }
        // 生成id
        const rank = genAscRankId();
        const c = {
            "name": name.trim(),
            "description": description,
            "id": rank,
            "rank": parseInt(rank),
            "removable": true,
            "renameable": true,
        };
        // 拷贝为副本更新，否则无法监听到改变而渲染
        let newObj = {...PassDtoReceived};
        newObj.loadedItems.category.push(c);
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
        handleCancel()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal destroyOnClose={true} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }} centered={true} maskClosable={false} closeIcon={null}
               title={t("categoryInsetWindowTitle")} open={isModalOpen} >
            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label={t("categoryInsetNameLabel")}
                    rules={[
                        {
                            required: true,
                            message: t("categoryInsetNameBlank"),
                        },
                        {
                            type: 'string',
                            min: 1,
                            max: 10,
                            whitespace:true,
                            message: t("categoryInsetNameLength"),
                        },
                    ]}
                >
                    <Input placeholder="" onChange={(e)=>{setName(e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="describe"
                    label={t("categoryInsetDescriptionLabel")}
                    rules={[
                        {
                            required: true,
                            message: t("categoryInsetDescriptionBlank"),
                        },
                        {
                            type: 'string',
                            min: 1,
                            max: 24,
                            whitespace:true,
                            message: t("categoryInsetDescriptionLength")

                        },
                    ]}
                >
                    <Input placeholder=""  onChange={(e)=>{setDescription(e.target.value)}}/>
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
export default DirectoryInsertModal;