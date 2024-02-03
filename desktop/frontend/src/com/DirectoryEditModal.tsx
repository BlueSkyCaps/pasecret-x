import {Button, Flex, Form, Input, message, Modal} from 'antd';
import {storagedata} from "../../wailsjs/go/models.js";
import {useContext} from "react";
import {PassDtoContext} from "../Core.js";

const DirectoryEditModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const { PassDtoReceived, setPassDtoReceived }:{PassDtoReceived:storagedata.PassDto,setPassDtoReceived:any} = useContext(PassDtoContext)
    const onFinish = () => {
        message.success('Submit success!');
        let c = {
            "name": "新建文件夹",
            "description": "新建文件夹测试",
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
               title={modalDisplayData.title} open={isModalOpen} >
            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="name"
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
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    name="describe"
                    label="describe"
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
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item>
                    <Flex  gap="small" justify="end" >
                        <Button onClick={handleCancel}>
                            {modalDisplayData.cancelText}
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {modalDisplayData.okText}
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default DirectoryEditModal;