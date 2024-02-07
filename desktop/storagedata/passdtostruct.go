package storagedata

type LoadedItems struct {
	Category    []Category  `json:"category"`
	Data        []Data      `json:"data"`
	Preferences Preferences `json:"preferences"`
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

// Preferences 加载的首选项配置，如启动密码。
type Preferences struct {
	LockPwd    string `json:"lockPwd"`
	LocalLang  string `json:"localLang"`
	SyncBranch int    `json:"syncBranch"`
}

// PassDto is a DTO (Data Transfer Object) for the front data.
// It contains the loadedItems当前已经解密了的存储的数据
type PassDto struct {
	LoadedItems *LoadedItems `json:"loadedItems"`
	ErrorMsg    string       `json:"errorMsg"`
}
