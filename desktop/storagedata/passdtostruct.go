package storagedata

import "desktop/preferences"

type LoadedItems struct {
	Category []Category `json:"category"`
	Data     []Data     `json:"data"`
}
type Category struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Id          string `json:"id"`
	Rank        int    `json:"rank"`
	Removable   bool   `json:"removable"`
	Renameable  bool   `json:"renameable"`
}
type Data struct {
	Name        string `json:"name"`
	AccountName string `json:"account_name"`
	Password    string `json:"password"`
	Site        string `json:"site"`
	Remark      string `json:"remark"`
	Id          string `json:"id"`
	CategoryId  string `json:"category_id"`
}
type T struct {
	LockPwd   string `json:"lock_pwd"`
	LocalLang string `json:"local_lang"`
}

// PassDto is a DTO (Data Transfer Object) for the front data.
// It contains the loadedItems当前已经解密了的存储的数据 and the language当前配置的语言.
type PassDto struct {
	LoadedItems LoadedItems             `json:"loadedItems"`
	Preferences preferences.Preferences `json:"preferences"`
}
