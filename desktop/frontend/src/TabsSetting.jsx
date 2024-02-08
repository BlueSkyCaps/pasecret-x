import React, {useEffect} from 'react';
import {
    DatabaseFilled,
    DownOutlined,
    LikeFilled, LockFilled,
    RollbackOutlined, ShareAltOutlined, SmileFilled,
    TranslationOutlined,
} from '@ant-design/icons';
import {Button, message, Modal, notification, Space, Spin, Tree} from 'antd';
import {useTranslation} from "react-i18next";
import {useState} from "react";
import SettingLockModal from "./setting/SettingLockModal.jsx";
import {BackupSaveFileDialog, LoadedItemsUpdate, OpenBrowserUri, ReloadOpenFileDialog} from "../wailsjs/go/main/App.js";
import {appLinkUri, blogUri, githubUri} from "./common.js";
import {useContext} from "react";
import {PassDtoContext} from "./Core";
import {changeLanguage} from "i18next";
const TabsSetting = () => {
    const { t, i18n } = useTranslation();
    const { PassDtoReceived, setPassDtoReceived } = useContext(PassDtoContext)
    const [settingLockModalOpen, setSettingLockModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState({});
    let [ing, setIng] =  useState(false);
    const treeData = [
        {
            title: t("treeSettingDictParent-StartPwd"),
            key: '0',
            icon: <LockFilled />,
            style: { marginBottom: 20},
        },
        {
            title: t("treeSettingDictParent-DumpRestore"),
            key: '1',
            icon: <DatabaseFilled />,
            style: { marginBottom: 20},
            children: [
                {
                    title: t('treeSettingDict-Dump'),
                    key: '1-0',
                    icon: <ShareAltOutlined />,
                    style: { marginBottom: 20},
                },
                {
                    title: t('treeSettingDict-Restore'),
                    key: '1-1',
                    icon: <RollbackOutlined />,
                    style: { marginBottom: 20},
                },
            ],
        },
        {
            title: t("treeSettingDictParent-Language"),
            key: '2',
            icon: <TranslationOutlined />,
            style: { marginBottom: 20},
        },
        {
            title: t("treeSettingDictParent-Donate"),
            key: '3',
            icon: <LikeFilled />,
            style: { marginBottom: 20},
        },
        {
            title: t("treeSettingDictParent-About"),
            key: '4',
            icon: <SmileFilled/>,
            style: { marginBottom: 20},
        },
    ];

    function treeNodeSelectedHandler(key) {
        switch (key) {
            case '0':
                setSettingLockModalOpen(true)
                break
            case '1-0':
                BackupHandler()
                break
            case '1-1':
                ReloadHandler()
                break
            case '2':
                changeLanguageHandler()
                break
            case '3':
                message.info('捐助赞赏')
                break
            case '4':
                showAboutNotification()
                break
        }
    }
    function showAboutNotification() {
        // 显示关于的通知
        notification.open({
            message: t("aboutWindowTitle"),
            description: t("aboutStatementLabelText"),
            placement:"top",
            duration:null,
            // 调用Go的打开浏览器方法
            btn:(
                <Space>
                    <Button type="link" size="small" onClick={() => OpenBrowserUri(appLinkUri)}>
                        {t("aboutAppSiteLinkName")}
                    </Button>
                    <Button type="link" size="small" onClick={() =>OpenBrowserUri(blogUri)}>
                        {t("aboutMySiteLinkName")}
                    </Button>
                    <Button type="link" size="small" onClick={() => OpenBrowserUri(githubUri)}>
                        Github
                    </Button>
                </Space>
            )
        });
    }

    function changeLanguageHandler() {
        if (PassDtoReceived.loadedItems.preferences.localLang==="zh"){
            PassDtoReceived.loadedItems.preferences.localLang="en"
            message.info('changed to English wow!')
        }else {
            PassDtoReceived.loadedItems.preferences.localLang="zh"
            message.info('中文牛掰 666')
        }
        LoadedItemsUpdate(PassDtoReceived.loadedItems)
        // 更新渲染，此时Core组件中的useEffect监听到PassDtoReceived.xx.localLang改变，执行useEffect切换语言
        setPassDtoReceived({...PassDtoReceived})
    }
    function BackupHandler() {
        setIng(true)
        BackupSaveFileDialog().then(r => {
            setIng(false)
            message.success(t("dumpDoneShowInformation"))
        }).catch(e => {
            setIng(false)
            // e如果是"_"則用戶取消的對話框，不是"_"就是Go报错
            if (e !== "_"){
                console.error(e)
                message.error(e)
            }
        })
    }

    function ReloadHandler() {
        Modal.confirm({
            title: t("dialogShowInformationTitle"),
            content: t("restoreBeginShowConfirm"),
            cancelText: t("restoreCancelButtonText"),
            okText: t("restoreOkButtonText"),
            onOk:() => {
                setIng(true)
                ReloadOpenFileDialog().then(r => {
                    setIng(false)
                    message.success(t("restoreDoneShowInformation"))
                    setTimeout(() =>{
                        // 还原成功重新加载
                        window.location.reload()
                    },2000)
                }).catch(e => {
                    setIng(false)
                    // e如果是"_" 則用戶取消的對話框，不是"_"就是Go报错
                    if (e !== "_"){
                        setIng(false)
                        console.error(e)
                        message.error(e)
                    }
                })
            }
        });
    }

    return (
        <>
            {ing && <div><Spin tip={t("spinningTips")} size="large"><div className="content" /></Spin></div>}
            {settingLockModalOpen && <SettingLockModal isModalOpen={settingLockModalOpen} setIsModalOpen={setSettingLockModalOpen}/>}
            <Tree
                style={{ fontSize: 18}}
                showIcon
                onSelect={(key) => {treeNodeSelectedHandler(key[0])}}
                switcherIcon={<DownOutlined />}
                treeData={treeData}
            />
        </>
    )

};
export default TabsSetting;