import * as FileSystem from 'expo-file-system';
import {appDir, resourceDJson, resourceDPath} from "@/constants/InitResource";
import {Dispatch, SetStateAction, useState} from "react";
import {readResourceD} from "@/components/StoreData";


let inited:boolean;
let setInited:Dispatch<SetStateAction<boolean>>;
export function useInit() : boolean{
    [inited, setInited] = useState<boolean>(false)
    if (inited){
        return inited
    }
    _init()
    console.log("useInit "+inited)
    return inited
}
async function _init() {
    // FileSystem.documentDirectory下创建appDir目录
    // FileSystem.documentDirectory为 "file:///data/user/0/host.exp.exponent/files/"
    if (FileSystem.documentDirectory != null) {
        try {
            let fileInfo = await FileSystem.getInfoAsync(appDir);
            if (!fileInfo.exists) {
                // 不存在则创建appDir
                await createAppDir()
            }
            fileInfo = await FileSystem.getInfoAsync(resourceDPath);
            if (!fileInfo.exists) {
                // 不存在则创建本地数据存储文件
                await createAndWriteResourceD(JSON.stringify(resourceDJson))
            }
            await readResourceD()
            setInited(true)
            console.log("_  useInit "+inited)
        }catch (err:any){
            alert(err.message)
        }
    }
}

const createAppDir = async () => {
    alert()
    await FileSystem.makeDirectoryAsync(appDir);
}

export const createAndWriteResourceD = async (contents:string) => {
    // 写入内容到resourceDPath文件，不存在则会创建
    await FileSystem.writeAsStringAsync(resourceDPath, contents, {encoding: FileSystem.EncodingType.UTF8});
}