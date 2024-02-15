import * as FileSystem from 'expo-file-system';
import {storagedata} from "@/components/Models";
import {resourceDPath} from "@/constants/InitResource";


export let _LoadedItems : storagedata.LoadedItems;

// 读取本地存储数据并解析成全局变量供后续使用
export const readResourceD = async () => {
    let get = await FileSystem.readAsStringAsync(resourceDPath, {encoding: FileSystem.EncodingType.UTF8});
    _LoadedItems = JSON.parse(get)
}
