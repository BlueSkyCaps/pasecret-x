import {Alert, Button, Flex, Form, Input, message, Modal, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {PassDtoContext} from "../Core";
import {isNullOrWhitespace} from "../utils.js";
import {LoadedItemsUpdate} from "../../wailsjs/go/main/App.js";
import {Quit} from "../../wailsjs/runtime/runtime.js";

// 定义一个匹配6个数字的正则表达式
const regex = /^\d{6}$/;

const SettingLockModal = ({isModalOpen,setIsModalOpen}) => {
    const {t} = useTranslation()
    const { PassDtoReceived, setPassDtoReceived } = useContext(PassDtoContext)
    let lockPwd = PassDtoReceived.loadedItems.preferences.lockPwd;
    const [pwdInputValues,setPwdInputValues ] = useState({
        orgPwd: "",
        one: "",
        two: "",
    })
    const rules = [
        {
            validator: (_, value) =>{
                if (!regex.test(value)) {
                    return Promise.reject(new Error(t("lockPwdNot6NumberShowInformation")))
                }
                return Promise.resolve()
            }
        }
    ]
    const handleCancel = () => {
        if (isNullOrWhitespace(lockPwd)){
            // 原先没有设置启动密码，强制设置启动密码却点击了取消，则直接退出程序
            Quit()
        }
        //  原先设置有启动密码，修改启动密码时点击了取消，则关闭模态
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
        PassDtoReceived.loadedItems.preferences.lockPwd =  pwdInputValues.one;
        // 传递给Go更新本地
        LoadedItemsUpdate(PassDtoReceived.loadedItems)
        .then(()=>{
            message.success(t("lockPwdSetTipDoneInformation"))
            handleCancel();
            // 重新加载界面
            setTimeout(()=>{window.location.reload()}, 2000)
        })
        .catch((error) =>{
            // 更新失败还是原密码
            PassDtoReceived.loadedItems.preferences.lockPwd=lockPwd
            message.error(t("dialogShowErrorTitle") + error);
        })
    };

    return (
        <>
            <Modal cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}  centered={true} maskClosable={false} closeIcon={null}
                   width={300}
                   title={t("setLockWindowTitle")} open={isModalOpen}  onCancel={handleCancel}>
                {/*若无启动密码则显示必须设置启动密码的提示*/}
                {isNullOrWhitespace(lockPwd)&& <Alert message={t("lockPwdSetTipShowConfirm")} type="warning" showIcon />}
                <br></br>
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
                        <Input.Password onChange={(e)=>{
                            pwdInputValues.orgPwd = e.target.value
                            setPwdInputValues(pwdInputValues)
                        }}/>
                    </Form.Item>
                    <Form.Item
                        name="one"
                        label={t("lockPwd6NumLabel")}
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