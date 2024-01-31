import App from "./App";
import Lock from "./Lock.jsx";
import {useState} from "react";
import {GetLockPwdFirst} from "../wailsjs/go/main/App.js";

 function Core() {
    // 是否正在获取锁屏密码的状态
    const [isGetLockPwdING, setIsGetLockPwd] = useState(true);
    // 已经获取到的锁屏密码
    const [lockPwd, setLockPwd] = useState("")
    GetLockPwdFirst().then((res) =>{
        setIsGetLockPwd(false)
        setLockPwd(res)
        console.log(res)
     })
     return (
        isGetLockPwdING ? <></> :
            lockPwd === "" ? <App/> : <Lock/>
    )
}

export default Core