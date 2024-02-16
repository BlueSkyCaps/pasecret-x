import * as FileSystem from 'expo-file-system';
import {storagedata} from "@/components/Models";
import {resourceDPath} from "@/constants/InitResource";


export let _LoadedItems : storagedata.LoadedItems;

// 读取本地存储数据并解析成全局变量供后续使用
export const readResourceD = async () => {
    let get = await FileSystem.readAsStringAsync(resourceDPath, {encoding: FileSystem.EncodingType.UTF8});
    _LoadedItems = JSON.parse(get)
    _LoadedItems.category =  [
        {
            "name": "证件",
            "description": "身份证、护照等居民证件",
            "id": "0",
            "rank": 0,
            "removable": false,
            "renameable": false
        },
        {
            "name": "银行卡",
            "description": "银行类的储蓄卡、信用卡等",
            "id": "1",
            "rank": 1,
            "removable": false,
            "renameable": false
        },
        {
            "name": "Web网站",
            "description": "需要用户名和密码的网站",
            "id": "2",
            "rank": 2,
            "removable": false,
            "renameable": false
        },
        {
            "name": "应用程序",
            "description": "需要用户名和密码的应用程序",
            "id": "3",
            "rank": 3,
            "removable": false,
            "renameable": false
        },
        {
            "name": "其余",
            "description": "暂未归类的账户信息",
            "id": "46",
            "rank": 4,
            "removable": false,
            "renameable": false
        },
        {
            "name": "其余",
            "description": "暂未归类的账户信息",
            "id": "45",
            "rank": 4,
            "removable": false,
            "renameable": false
        },
        {
            "name": "其余",
            "description": "暂未归类的账户信息",
            "id": "44",
            "rank": 4,
            "removable": false,
            "renameable": false
        },
        {
            "name": "其余",
            "description": "暂未归类的账户信息",
            "id": "43",
            "rank": 4,
            "removable": false,
            "renameable": false
        },{
            "name": "其1余",
            "description": "暂未归类的账户信息",
            "id": "41",
            "rank": 4,
            "removable": false,
            "renameable": false
        }
    ]
}
