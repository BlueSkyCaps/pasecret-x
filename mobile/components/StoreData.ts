import * as FileSystem from 'expo-file-system';
import {storagedata} from "@/components/Models";
import {resourceDPath} from "@/constants/InitResource";


// 全局存储更新数据 该变量只用于保存数据到本地文件系统 且不进行密码项的解密操作 渲染组件内容用上下文state初始化的_LoadedItems
export let _LoadedItems_Save : storagedata.LoadedItems;
// 上下文渲染组件state初始化时使用的变量，当_LoadedItems_Save保存文件系统成功时，才同步操作state用于更新组件显示数据
export let _LoadedItems : storagedata.LoadedItems;

// 读取本地存储数据并解析成全局变量供后续使用
export const readResourceD = async () => {
    let get = await FileSystem.readAsStringAsync(resourceDPath, {encoding: FileSystem.EncodingType.UTF8});
    _LoadedItems_Save = JSON.parse(get)
    // 深拷贝 避免两个全局变量引用一致
    _LoadedItems = JSON.parse(JSON.stringify(_LoadedItems_Save))
    // 解密密码项
    decLoadedItems();
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

function decLoadedItems() {

}