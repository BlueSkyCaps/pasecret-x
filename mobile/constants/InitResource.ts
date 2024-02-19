import * as FileSystem from "expo-file-system";

export const appDir =  FileSystem.documentDirectory + 'pasecret-x';

export const resourceDPath= appDir+'/' + 'd.json';

// 用于初始化的数据文件 第一次運行app加載此json數據格式存儲于app文件系统目錄中
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

// 本地化文本 用于i18n库
export const i18nResources = {
  en: {
    translation: {
      "spinningTips": "Executing...",
      "dialogShowInformationTitle": "Prompt",
      "dialogShowErrorTitle": "Error issued-",
      "lockPwdShowConfirmChi": "choose",
      "lockPwdAlreadySetShowConfirm": "Do you want to close startup password?",
      "lockPwdClosedShowInformation": "Closed startup password.",
      "lockPwd4OrgNumLabel": "Enter original password:",
      "lockPwd6NumLabel": "Enter a six-digit password:",
      "lockPwdAgainConfirmLabel": "Confirm the input again:",
      "lockPwdCancelLabel": "Cancel",
      "lockPwdOkLabel": "OK",
      "lockPwdClose": "Close pwd",
      "lockPwdNot6NumberShowInformation": "Please enter 6 digits！",
      "lockPwdOrgNotCorrectInformation": "Oops! The original password is incorrect",
      "lockPwdNotNotMatchShowInformation": "The passwords do not match！",
      "lockPwdSetTipShowConfirm": "important hint! To ensure security, you must set a startup password. If you forget the startup password later, you will not be able to access the stored records! Be sure to remember the password, and of course, you can still change your startup password at any time later.",
      "lockPwdSetTipDoneInformation": "The startup password has been reset",
      "lockLabelText": "Unlock Please",
      "directoryInfoOkText": "OK",
      "directoryInfoItemsCount": "There are {{count}} items stored under this category.",
      "aboutWindowTitle": "About",
      "aboutStatementLabelText": "PasecretX is an account and password manager that works on multiple platforms. You can use it on your phone and sync your data to your computer. The data is encrypted and can be used off the network without transmitting any of your native data to the remote device. Author: BlueSkyCaps. Donations are welcome and the authors are grateful. This program encrypts and stores your saved data, but it does not mean that your data is 100% safe. If you use this program to cause data loss or account password leakage, this program and the author are not responsible. By using the Program, you agree to this content.",
      "aboutAppSiteLinkName": "Home page",
      "aboutMySiteLinkName": "Author blog",
      "donateWindowTitle": "Donate",
      "donateOpenShowConfirm": "Donations appreciate the need\nfor internet connectivity Get\nappreciation QR codes, list of\nappreciators.This app will not\npass any other data.\nDo you want to continue?",
      "dumpDoneShowInformation": "The data has been backed up to the path \nof your choice that you can use for restore.",
      "restoreInvalidShowCustom": "Restore failed, not a valid Pasecret data file!\n{{.errMsg}}",
      "restoreDoneShowInformation": "The data has been restored.",
      "restoreBeginShowConfirm": "You are about to restore data. If the restore is successful, the original data will be overwritten. sure?",
      "restoreOkButtonText": "YES！",
      "restoreCancelButtonText": "NO..",
      "settingTabShowErrorMaintenance": "During maintenance, look forward to it.",
      "categoryCanNotEditTips": "The collation cannot be edited",
      "categoryCanNotDelTips": "The collation cannot be deleted.",
      "categoryDelConfirmMsg": "Are you sure to delete'{{name}}'? All passwords saved in this collation will be deleted.",
      "categoryDelConfirmOkText": "YES!",
      "categoryDelConfirmCancelText": "Cancel",
      "SearchInputText": "Search items..",
      "SearchWindowTitle": "Search results",
      "SearchWindowOkText": "Close",
      "treeSettingDictParent-StartPwd": "Startup password",
      "treeSettingDictParent-DumpRestore": "Backup and restore",
      "treeSettingDictParent-Language": "Language/语言",
      "treeSettingDictParent-Donate": "Donate",
      "treeSettingDictParent-About": "About",
      "treeSettingDict-Dump": "Backup data",
      "treeSettingDict-Restore": "Restore data to the local machine",
      "setLockWindowTitle": "Set the startup password",
      "categoryInsetWindowTitle": "New collation",
      "categoryEditWindowTitle": "Edit collation",
      "categoryInsetNameLabel": "Name：",
      "categoryInsetDescriptionLabel": "Description：",
      "categoryInfoCanDelIfLabel": "Can be deleted?",
      "categoryInfoCanDelLabel": "Can be deleted",
      "categoryInfoCanNotDelLabel": "Built-in collation folder, cannot be deleted.",
      "categoryInfoCanEditIfLabel": "Can be edited?",
      "categoryInfoCanEditLabel": "Can be edited",
      "categoryInfoCanNotEditLabel": "Built-in collation folder, cannot be edited.",
      "categoryInsetCancelButtonText": "Cancel",
      "categoryInsetOkButtonText": "OK",
      "categoryInsetNameBlank": "The collation folder name cannot be empty",
      "categoryInsetDescriptionBlank": "The description cannot be empty",
      "categoryNoItems": "There is no data under this category",
      "categoryInsetNameLength": "The name is less than 10 char, and not allow empty",
      "categoryInsetDescriptionLength": "The description is less than 24 char, and not allow empty",
      "categoryInsetNameConfirm": "\nDo you want to save?",
      "dataListCloseWindowButtonText": "Close",
      "dataListBackWindowButtonText": "Back",
      "dataListDeShowConfirm": "Are you sure delete this record?",
      "dataInsertWindowTitle": "Insert directory-item",
      "dataExitedTips": "This category already has a record with the same name, please change the name.",
      "categoryExitedTips": "This category name already existed, please change the name.",
      "dataEditWindowTitle": "Edit directory-item",
      "dataEditNameLabel": "Name：",
      "dataEditPwdLabel": "Password：",
      "dataEditSiteLabel": "WebSite：",
      "dataEditRemarkLabel": "Remark：",
      "copyStr": "Name：\n{{name}}\nAccount：\n{{account_name}}\nPassword：\n{{password}}\nWebSite：\n{{site}}\nRemark：\n{{remark}}",
      "copyClipboardDone": "Content is copied.",
      "dataEditCancelButtonText": "cancel",
      "dataEditOkButtonText": "ok",
      "dataEditDynamicByIdNameLabel": "ID number:",
      "dataEditDynamicByBankNameLabel": "Card number:",
      "dataEditDynamicByUsualAccountNameLabel": "Account:",
      "dataEditNameBlank": "The item name is less than 40 char,and cannot be empty.",
      "SearchDataResultHeaderVDataName": "Items",
      "SearchDataResultHeaderVDataAccountName": "Account",
      "SearchDataResultHeaderVDataPassword": "Password",
      "SearchDataResultHeaderVDataSite": "WebSite",
      "SearchDataResultHeaderVDataRemark": "Remark",
      "SearchDataResultHeaderVDataCategoryName": "Collation folder",
      "buildInCategory0Name": "Identity Documents",
      "buildInCategory0Description": "ID Card, Driver's License, Passport..",
      "buildInCategory1Name": "Bank cards",
      "buildInCategory1Description": "Debit cards, credit cards..",
      "buildInCategory2Name": "Websites",
      "buildInCategory2Description": "Websites that require username and password",
      "buildInCategory3Name": "Software",
      "buildInCategory3Description": "Applications that require username and password",
      "buildInCategory4Name": "Other",
      "buildInCategory4Description": "Account information that is not yet categorized"
    }
  },
  zh: {
    translation: {
      "spinningTips": "正在执行中...",
      "dialogShowInformationTitle": "提示",
      "dialogShowErrorTitle": "错误发生-",
      "lockPwdShowConfirmChi": "选择",
      "lockPwdAlreadySetShowConfirm": "确定要关闭启动密码吗？",
      "lockPwdClosedShowInformation": "已关闭启动密码。",
      "lockPwd4OrgNumLabel": "输入原密码：",
      "lockPwd6NumLabel": "输入6位数密码：",
      "lockPwdAgainConfirmLabel": "再次确认输入：",
      "lockPwdCancelLabel": "取消",
      "lockPwdOkLabel": "确定",
      "lockPwdClose": "关闭密码",
      "lockPwdNot6NumberShowInformation": "请输入6个数字！",
      "lockPwdOrgNotCorrectInformation": "糟糕！原密码不正确",
      "lockPwdNotNotMatchShowInformation": "两次密码不匹配！",
      "lockPwdSetTipShowConfirm": "重要提示！为了确保密码安全，你必须设置启动密码。后续若忘记启动密码，你将无法访问已经存储的记录！务必牢记密码，当然，你仍可以在之后任何时间修改你的启动密码。",
      "lockPwdSetTipDoneInformation": "已更新启动密码。",
      "lockLabelText": "解锁",
      "directoryInfoOkText": "好的",
      "directoryInfoItemsCount": "该归类夹下存储了{{count}}个数据项。",
      "aboutWindowTitle": "关于",
      "aboutStatementLabelText": "PasecretX是一款能在多个平台运行的账号密码管理软件。您可以在手机上使用，并且同步数据到电脑端。数据采用加密算法，并且可以断网使用，不会传输您的任何本机数据到远程。作者：BlueSkyCaps。欢迎进行捐助赞赏，作者表示感激。本程序加密存储您保存的数据但不代表百分百能够保障您的数据安全。如您在使用此程序过程中产生数据丢失、账户密码泄露，本程序和作者不负任何责任，使用本程序代表您同意此内容。",
      "aboutAppSiteLinkName": "软件主页",
      "aboutMySiteLinkName": "作者博客",
      "donateWindowTitle": "捐助赞赏",
      "donateOpenShowConfirm": "捐助赞赏需要进行网络连接\n获取赞赏二维码、赞赏者列表。\n本应用不会传递任何其他数据，\n是否继续？",
      "dumpDoneShowInformation": "已备份数据到选择的目录中，可将其用于还原。",
      "restoreInvalidShowCustom": "还原失败，不是有效的Pasecret数据文件！\n{{.errMsg}}",
      "restoreDoneShowInformation": "数据已还原。",
      "restoreBeginShowConfirm": "你即将还原数据，还原成功本机原数据将被覆盖。确定吗？",
      "restoreOkButtonText": "确定",
      "restoreCancelButtonText": "容我再想..",
      "settingTabShowErrorMaintenance": "维护中，尽情期待。",
      "categoryCanNotEditTips": "该归类不可被编辑。",
      "categoryCanNotDelTips": "该归类不可被删除。",
      "categoryNoItems": "该归类下没有数据",
      "categoryDelConfirmMsg": "确定删除‘{{name}}’？该归类保存的所有密码一并会被删除。",
      "categoryDelConfirmOkText": "确定",
      "categoryDelConfirmCancelText": "取消",
      "SearchInputText": "搜索密码项..",
      "SearchWindowTitle": "搜索结果",
      "SearchWindowOkText": "关闭",
      "treeSettingDictParent-StartPwd": "启动密码",
      "treeSettingDictParent-DumpRestore": "备份还原",
      "treeSettingDictParent-Language": "Language/语言",
      "treeSettingDictParent-Donate": "捐助赞赏",
      "treeSettingDictParent-About": "关于",
      "treeSettingDict-Dump": "备份数据",
      "treeSettingDict-Restore": "还原数据到本机",
      "setLockWindowTitle": "设置启动密码",
      "categoryInsetWindowTitle": "添加新的归类",
      "categoryEditWindowTitle": "编辑归类",
      "categoryInsetNameLabel": "名称：",
      "categoryInsetDescriptionLabel": "描述：",
      "categoryInfoCanDelIfLabel": "可被删除：",
      "categoryInfoCanDelLabel": "可以删除。",
      "categoryInfoCanNotDelLabel": "内置归类夹，无法删除。",
      "categoryInfoCanEditIfLabel": "可被编辑：",
      "categoryInfoCanEditLabel": "可以编辑。",
      "categoryInfoCanNotEditLabel": "内置归类夹，无法编辑。",
      "categoryInsetCancelButtonText": "取消",
      "categoryInsetOkButtonText": "确定",
      "categoryInsetNameBlank": "归类文件夹名称不能是空的。",
      "categoryInsetDescriptionBlank": "描述不能是空的。",
      "categoryInsetNameLength": "归类名称小于10个字符，不允许空字符",
      "categoryInsetDescriptionLength": "描述文本小于24个字符，不允许空字符",
      "categoryExitedTips": "该归类名称已存在，请换个名称。",
      "categoryInsetNameConfirm": "\n是否保存？",
      "dataListCloseWindowButtonText": "关闭",
      "dataListBackWindowButtonText": "返回",
      "dataListDeShowConfirm": "确定要删除此条记录吗？",
      "dataInsertWindowTitle": "添加账户密码项",
      "dataExitedTips": "该归类下已有相同名称的记录，请换个名称。",
      "dataEditWindowTitle": "编辑账户密码项",
      "dataEditNameLabel": "名称：",
      "dataEditPwdLabel": "密码：",
      "dataEditSiteLabel": "网址：",
      "dataEditRemarkLabel": "备注：",
      "copyStr": "名称：\n{{name}}\n账号：\n{{account_name}}\n密码：\n{{password}}\n网址：\n{{site}}\n备注：\n{{remark}}",
      "copyClipboardDone": "已复制到剪切板。",
      "dataEditCancelButtonText": "取消",
      "dataEditOkButtonText": "确定",
      "dataEditDynamicByIdNameLabel": "证件号码:",
      "dataEditDynamicByBankNameLabel": "卡号:",
      "dataEditDynamicByUsualAccountNameLabel": "账号:",
      "dataEditNameBlank": "名称最大40个字符，不能是空的。",
      "SearchDataResultHeaderVDataName": "名称",
      "SearchDataResultHeaderVDataAccountName": "账号",
      "SearchDataResultHeaderVDataPassword": "密码",
      "SearchDataResultHeaderVDataSite": "网址",
      "SearchDataResultHeaderVDataRemark": "备注",
      "SearchDataResultHeaderVDataCategoryName": "所属归类夹",
      "buildInCategory0Name": "证件",
      "buildInCategory0Description": "身份证、护照等居民证件",
      "buildInCategory1Name": "银行卡",
      "buildInCategory1Description": "银行类的储蓄卡、信用卡等",
      "buildInCategory2Name": "Web网站",
      "buildInCategory2Description": "需要用户名和密码的网站",
      "buildInCategory3Name": "应用程序",
      "buildInCategory3Description": "需要用户名和密码的应用程序",
      "buildInCategory4Name": "其余",
      "buildInCategory4Description": "暂未归类的账户信息"
    }
  }
};