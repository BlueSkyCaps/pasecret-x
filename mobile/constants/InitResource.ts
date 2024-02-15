// 用于初始化的数据文件 第一次運行app加載此json數據格式存儲于app文件系统目錄中
import * as FileSystem from "expo-file-system";

export const appDir =  FileSystem.documentDirectory + 'pasecret-x';

export const resourceDPath= appDir+'/' + 'd.json';

export const resourceDJson={
  "category": [
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
      "id": "4",
      "rank": 4,
      "removable": false,
      "renameable": false
    }
  ],
  "data": [
  ],
  "preferences": {
    "lockPwd": "",
    "localLang": "zh",
    "syncBranch": 0
  }
}
