import {Button, Flex, Form, Input, message, Modal, Space} from "antd";
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core";
import {isNullOrWhitespace} from "../utils.js";
import {LoadedItemsUpdate, PreferencesUpdate} from "../../wailsjs/go/main/App.js";
// 定义一个匹配四个数字的正则表达式
const regex = /^\d{4}$/;
const SettingLockModal = ({isModalOpen,setIsModalOpen}) => {
    const {t} = useTranslation()
    const { PassDtoReceived, setPassDtoReceived } = useContext(PassDtoContext)
    const lockPwd = PassDtoReceived.preferences.lockPwd;
    const [pwdInputValues,setPwdInputValues ] = useState({
        orgPwd: "",
        one: "",
        two: "",
    })
    const rules = [
        {
            validator: (_, value) =>{
                if (!regex.test(value)) {
                    return Promise.reject(new Error(t("lockPwdNot4NumberShowInformation")))
                }
                return Promise.resolve()
            }
        }
    ]
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinishFailed = () => {
    };
    const onFinish = () => {
        // 原先设置有启动密码，则验证原密码对不对
        if (!isNullOrWhitespace(lockPwd)){
            if(lockPwd!== pwdInputValues.orgPwd){
                message.error(t("lockPwdOrgNotCorrectInformation"))
                return
            }
        }
        if(pwdInputValues.one!== pwdInputValues.two){
            message.warning(t("lockPwdNotNotMatchShowInformation"))
            return
        }
        // 存储新的启动密码
        PassDtoReceived.preferences.lockPwd =  pwdInputValues.one;
        // 传递给Go更新本地
        PreferencesUpdate(PassDtoReceived.preferences)
            .then(()=>{
                // 更新数据
                setPassDtoReceived({...PassDtoReceived})
                message.success(t("lockPwdSetTipDoneInformation"))
                setTimeout(()=>{window.location.reload()}, 2000)
            })
            .catch((error) =>{
                message.error(t("dialogShowErrorTitle") + error.message);
            })
        handleCancel();
    };

    // 点击了关闭锁屏密码
    const closePwd=()=>{
        // 验证原密码对不对
        if (!isNullOrWhitespace(lockPwd)){
            if(lockPwd!== pwdInputValues.orgPwd){
                message.error(t("lockPwdOrgNotCorrectInformation"))
                return
            }
        }
        Modal.confirm({
            title: t("dialogShowInformationTitle"),
            content: t("lockPwdAlreadySetShowConfirm"),
            cancelText: t("lockPwdCancelLabel"),
            okText: t("lockPwdOkLabel"),
            onOk:() => {
                // 启动密码置空
                PassDtoReceived.preferences.lockPwd =  "";
                // 传递给Go更新本地
                PreferencesUpdate(PassDtoReceived.preferences)
                    .then(()=>{
                        // 更新数据
                        setPassDtoReceived({...PassDtoReceived})
                        message.success(t("lockPwdClosedShowInformation"))
                    })
                    .catch((error) =>{
                        message.error(t("dialogShowErrorTitle") + error.message);
                    })
            }
        });
    }
    return (
        <>
            <Modal cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}  centered={true} maskClosable={false} closeIcon={null}
                   width={300}
                   title={t("setLockWindowTitle")} open={isModalOpen}  onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        hidden={!!isNullOrWhitespace(lockPwd)}
                        name="orgPwd"
                        label={t("lockPwd4OrgNumLabel")}
                        rules={isNullOrWhitespace(lockPwd)?[]:rules}
                    >
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input.Password onChange={(e)=>{
                                pwdInputValues.orgPwd = e.target.value
                                setPwdInputValues(pwdInputValues)
                            }}/>
                            <Button onClick={()=>{closePwd()}} type="primary" danger ghost>{t("lockPwdClose")}</Button>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item
                        name="one"
                        label={t("lockPwd4NumLabel")}
                        rules={rules}
                    >
                        <Input.Password onChange={(e)=>{
                            pwdInputValues.one = e.target.value
                            setPwdInputValues(pwdInputValues)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="two"
                        label={t("lockPwdAgainConfirmLabel")}
                        rules={rules}
                    >
                        <Input.Password onChange={(e)=>{
                            pwdInputValues.two = e.target.value
                            setPwdInputValues(pwdInputValues)
                        }}/>
                    </Form.Item>
                    <Form.Item>
                        <Flex  gap="small" justify="end" >
                            <Button onClick={handleCancel}>
                                { t("lockPwdCancelLabel")}
                            </Button>
                            <Button type="primary" danger  htmlType="submit">
                                {t("lockPwdOkLabel")}
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default SettingLockModal;