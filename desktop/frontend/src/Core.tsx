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
     useEffect(() =>{
         i18n.changeLanguage("zh")
     },[])

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