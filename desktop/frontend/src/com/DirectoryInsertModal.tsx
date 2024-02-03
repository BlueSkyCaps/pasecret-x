
import {Button, Flex, Form, Input, message, Modal} from 'antd';
import {storagedata} from "../../wailsjs/go/models.js";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core.js";
import { useTranslation } from 'react-i18next';
const DirectoryInsertModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const {t} = useTranslation()
    const onFinish = () => {
        // message.success('Submit success!');
        let c = {
            "name": name,
            "description": description,
            "id": "99",
            "rank": 99,
            "removable": true,
            "renameable": true,
        }
        let newObj = {...PassDtoReceived};
        newObj.loadedItems.category.push(c);
        setPassDtoReceived(newObj);
        handleCancel()
    };
    const onFinishFailed = () => {
    };
    const handleOk = () => {
        setIsModalOpen(false);
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
                            message: '不得为空'
                        },
                        {
                            type: 'string',
                            min: 1,
                            max: 10,
                            whitespace:true,
                            message: '归类夹名大于1个字符，小于10个字符，不允许空字符'
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
                            message: '不得为空'
                        },
                        {
                            type: 'string',
                            min: 1,
                            max: 24,
                            whitespace:true,
                            message: '描述大于1个字符，小于24个字符，不允许空字符'

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