import {Button, Flex, Form, Input, message, Modal} from 'antd';
import {storagedata} from "../../wailsjs/go/models.js";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core.js";
import { useTranslation } from 'react-i18next';
import {LoadedItemsUpdate} from "../../wailsjs/go/main/App";
const DirectoryEditModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    // 找到当前编辑的归类夹元素
    const cs:any = PassDtoReceived.loadedItems.category
    let editC = cs.find((item) => item.id === modalDisplayData["id"]);
    const [name,setName] = useState(editC.name)
    const [description,setDescription] = useState(editC.description)
    const {t} = useTranslation()
    const onFinish = () => {
        // 更新当前编辑的归类夹元素，category是数组引用，js中数组是引用传递，
        // 该元素是PassDtoReceived.loadedItems.category中获取到的，所以直接修改即可更新
        editC.name =name
        editC.description =description
        // 更新渲染
        setPassDtoReceived(PassDtoReceived);
        // 传递给Go存储
        LoadedItemsUpdate(PassDtoReceived.loadedItems).catch((error) =>{
            message.error(t("dialogShowErrorTitle")+error.message);
        });
        handleCancel()
    };
    const onFinishFailed = () => {
        alert(name)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal destroyOnClose={true} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }} centered={true} maskClosable={false} closeIcon={null}
               title={t("categoryEditWindowTitle")} open={isModalOpen} >
            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label={t("categoryInsetNameLabel")}
                    /*设置子元素即input的默认值，若在input设置defaultvalue，则有值但不修改会导致rules验证为空不通过*/
                    initialValue={name}
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
                    <Input placeholder=""
                           onChange={(e)=>{setName(e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    name="describe"
                    label={t("categoryInsetDescriptionLabel")}
                    initialValue={description}
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
                    <Input placeholder=""
                           onChange={(e)=>{setDescription(e.target.value)}}/>
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
export default DirectoryEditModal;