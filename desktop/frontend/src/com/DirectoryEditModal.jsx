
import React from 'react';
import {Button, Flex, Form, Input, message, Modal} from 'antd';
const nameRule=[
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
]
const desRule=[
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
]
const DirectoryEditModal = ({isModalOpen,setIsModalOpen,modalDisplayData}) => {
    const onFinish = () => {
        message.success('Submit success!');
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
                    rules={nameRule}
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    name="describe"
                    label="describe"
                    rules={desRule}
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item>
                    <Flex  gap="small" justify="end" >
                        <Button onClick={handleCancel}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default DirectoryEditModal;