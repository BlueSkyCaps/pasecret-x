import React, {useEffect} from 'react';
import {
    DatabaseFilled,
    DownOutlined,
    LikeFilled, LockFilled,
    RollbackOutlined, ShareAltOutlined, SmileFilled,
    TranslationOutlined,
} from '@ant-design/icons';
import {message, Tree} from 'antd';
import {useTranslation} from "react-i18next";
import {useState} from "react";
import SettingLockModal from "./setting/SettingLockModal.jsx";
const TabsSetting = () => {
    const { t, i18n } = useTranslation();
    const [settingLockModalOpen, setSettingLockModalOpen] = useState(false);
    const [modalDisplayData, setModalDisplayData] = useState({});
    const treeData = [
        {
            title: t("treeSettingDictParent-StartPwd"),
            key: '0',
            icon: <LockFilled />,
            style: { marginBottom: 20},
            onSelect: () => {
                alert()
            }
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
                message.info('备份数据')
                break
            case '1-1':
                message.info('还原数据到本机')
                break
            case '2':
                message.info('Language/语言')
                break
            case '3':
                message.info('捐助赞赏')
                break
            case '4':
                message.info('关于')
                break
        }
    }
    return (
        <>
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