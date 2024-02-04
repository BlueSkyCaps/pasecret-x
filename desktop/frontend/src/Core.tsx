import App from "./App";
import Lock from "./Lock.js";
import {createContext, useEffect, useState} from "react";
import {DtoJsonFirst} from "../wailsjs/go/main/App.js";
import {storagedata} from "../wailsjs/go/models";
import {isNullOrEmpty} from "./utils.js";
import {useTranslation} from "react-i18next";

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
     useEffect(() =>{
         // 获取数据 这些数据已在Go中被解密
         DtoJsonFirst().then((result) => {
             // 在wails调式模式下，刷新浏览器将会恢复到上一次的数据，因为PassDtoReceived不为空
             if (PassDtoReceived === null){
                 setIsGetLockPwd(false)
                 setPassDtoReceived(result)
                 console.log("DtoJsonFirst::", result)
             }
         });
     },[])
     return (
             isGetLockPwdING ? <></> :
             isNullOrEmpty(PassDtoReceived.preferences.lockPwd) ?
            // 通过上下文传递数据
             <PassDtoContext.Provider value={{PassDtoReceived, setPassDtoReceived}}>
                 <App/>
             </PassDtoContext.Provider> :
             <PassDtoContext.Provider value={{PassDtoReceived, setPassDtoReceived}}>
                <Lock/>
             </PassDtoContext.Provider>
    )
}

export default Core