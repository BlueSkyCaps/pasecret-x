import * as FileSystem from 'expo-file-system';
import {storagedata} from "@/components/Models";
import {resourceDPath} from "@/constants/InitResource";


export let _LoadedItems_Save : storagedata.LoadedItems;

// 读取本地存储数据并解析成全局变量供后续使用
export const readResourceD = async () => {
    let get = await FileSystem.readAsStringAsync(resourceDPath, {encoding: FileSystem.EncodingType.UTF8});
    _LoadedItems_Save = JSON.parse(get)
    _LoadedItems_Save.data =  [
        {
            name: "item11111111111111111111111",
            id: "0",
            account_name: "账户名1",
            password: "paswword1",
            site: "site1",
            remark: "remark1",
            category_id: "0",
        },
        {
            name: "item2",
            id: "1",
            account_name: "账户名21",
            password: "paswword12",
            site: "site12",
            remark: "remark12",
            category_id: "0",

        },
        {
            name: "item3",
            id: "2",
            account_name: "账户名3",
            password: "paswword333",
            site: "site3",
            remark: "remark33",
            category_id: "1",

        },
    ]
}
