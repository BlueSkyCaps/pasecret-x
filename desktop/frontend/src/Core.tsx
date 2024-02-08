import Lock from "./Lock.js";
import {createContext, useEffect, useState} from "react";
import {DtoJsonFirst} from "../wailsjs/go/main/App.js";
import {storagedata} from "../wailsjs/go/models";
import {isNullOrWhitespace} from "./utils.js";
import {useTranslation} from "react-i18next";
import {message} from "antd";
import SettingLockModal from "./setting/SettingLockModal";

// 创建上下文
export const PassDtoContext = createContext(null);

 function Core() {
     // 获取 i18n hook
     const { t, i18n } = useTranslation();

     // 是否正在获取锁屏密码的状态
    const [isGetLockPwdING, setIsGetLockPwd] = useState(true);
     const [PassDtoReceived,setPassDtoReceived] = useState<storagedata.PassDto>(null);
     const [mustSetLockModalOpen, setMustSetLockModalOpen] = useState(true);
     useEffect(() =>{
         // 获取数据 这些数据已在Go中被解密
         DtoJsonFirst().then((result) => {
             if (PassDtoReceived === null){
                 if (!isNullOrWhitespace(result?.errorMsg)){
                     message.error(result?.errorMsg, 0)
                     return
                 }
                 setIsGetLockPwd(false)
                 setPassDtoReceived(result)
                 console.log("DtoJsonFirst::", result)
             }
         });
     },[])

     // 切换语言，该effect执行条件：
     //             -> 会在首次运行加载完第一次执行，此时PassDtoReceived?为空，因为还没获取到后端数据
     //             -> DtoJsonFirst()设置PassDtoReceived后监听到改变再次执行，此时真正设置了语言
     //             -> 后续只要设置界面点击语言按钮 修改xx.localLang的值setPassDtoReceived后监听到改变都会执行，切换设置的值
     // 不监听整个PassDtoReceived，因为只是设置语言字段localLang的改变，避免更新归类、密码项时该effect被执行
     useEffect(()=>{
         i18n.changeLanguage(PassDtoReceived?.loadedItems.preferences.localLang)
     },[PassDtoReceived?.loadedItems.preferences.localLang])

     return (
             isGetLockPwdING ? <></> :
             isNullOrWhitespace(PassDtoReceived.loadedItems.preferences.lockPwd) ?
            // 通过上下文传递数据
             <PassDtoContext.Provider value={{PassDtoReceived, setPassDtoReceived}}>
                {/* 未设置启动密码，则必须显示设置密码的模态框 */}
                <SettingLockModal isModalOpen={mustSetLockModalOpen} setIsModalOpen={setMustSetLockModalOpen}/>
             </PassDtoContext.Provider> :
             <PassDtoContext.Provider value={{PassDtoReceived, setPassDtoReceived}}>
                 <Lock/>
             </PassDtoContext.Provider>
    )
}

export default Core