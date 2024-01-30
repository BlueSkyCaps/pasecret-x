// Package storagedata 贮存密码箱数据，加载、保存本地存储库
package storagedata

import (
	"desktop/common"
	"desktop/pi18n"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
)

var StoDPath string
var loadedItems LoadedItems

// LoadInit 初始化載入本地存储库數據文件
func LoadInit(data []byte) LoadedItems {
	StoDPath = common.D_path
	// 不存在默认数据文件，则创建
	if !common.Existed(StoDPath) {
		r, err := common.CreateFile(StoDPath, data)
		if !r {
			println("err", "storage loadInit, CreateFile:"+err.Error())
			os.Exit(1)
		}
	}
	load(StoDPath)
	return loadedItems
}

// 从本地存储库d.json加载密码数据
func load(stoDPath string) {
	r, bs, err := common.ReadFileAsBytes(stoDPath)
	if !r {
		println("err", "storage load, ReadFileAsString:"+err.Error())
		os.Exit(1)
	}
	err = json.Unmarshal(bs, &loadedItems)
	if err != nil {
		println("err", "storage load, json.Marshal d:"+err.Error())
		os.Exit(1)
	}
	// 解密密码项
	decLoadedData()
	// 根据语言环境设置内置归类文件夹显示的文本
	//setCategoryToCartTextByLang()
}

// 若是内置归类夹，不能删除和编辑。根据当前语言环境设置标题和描述
func setCategoryToCartTextByLang() {
	var err error
	for i := 0; i < len(loadedItems.Category); i++ {
		var c int
		c, err = strconv.Atoi(string(loadedItems.Category[i].Id[0]))
		// 如果cid大於28，一定不是内置归类夹。因为新添加的归类夹id开头是日期形式大于28
		if len(loadedItems.Category[i].Id) > 28 {
			continue
		}
		// 变量c可以区分国际化文本的message id
		loadedItems.Category[i].Name = pi18n.LocalizedText(fmt.Sprintf("buildInCategory%dName", c), nil)
		loadedItems.Category[i].Description = pi18n.LocalizedText(fmt.Sprintf("buildInCategory%dDescription", c), nil)
	}
	if err != nil {
		println("err", "setCategoryToCartTextByLang:"+err.Error())
		os.Exit(1)
	}
}

// 解密所有密码项重新贮存AppRef
func decLoadedData() {
	var err error
	for i := 0; i < len(loadedItems.Data); i++ {
		loadedItems.Data[i].Name, err = common.DecryptAES([]byte(common.AppProductKeyAES), loadedItems.Data[i].Name)
		loadedItems.Data[i].Site, err = common.DecryptAES([]byte(common.AppProductKeyAES), loadedItems.Data[i].Site)
		loadedItems.Data[i].Remark, err = common.DecryptAES([]byte(common.AppProductKeyAES), loadedItems.Data[i].Remark)
		loadedItems.Data[i].Password, err = common.DecryptAES([]byte(common.AppProductKeyAES), loadedItems.Data[i].Password)
		loadedItems.Data[i].AccountName, err = common.DecryptAES([]byte(common.AppProductKeyAES), loadedItems.Data[i].AccountName)
	}
	if err != nil {
		println("err", "decLoadedData, common.DecryptAES:"+err.Error())
		os.Exit(1)
		return
	}
}

//
//// 加密所有密码项再保存至本地存储库
//func encryLoadedData() {
//	var err error
//	// 加密所有密码项
//	for i := 0; i < len(AppRef.LoadedItems.Data); i++ {
//		AppRef.LoadedItems.Data[i].Name, err = common.EncryptAES([]byte(common.AppProductKeyAES), AppRef.LoadedItems.Data[i].Name)
//		AppRef.LoadedItems.Data[i].Site, err = common.EncryptAES([]byte(common.AppProductKeyAES), AppRef.LoadedItems.Data[i].Site)
//		AppRef.LoadedItems.Data[i].Remark, err = common.EncryptAES([]byte(common.AppProductKeyAES), AppRef.LoadedItems.Data[i].Remark)
//		AppRef.LoadedItems.Data[i].Password, err = common.EncryptAES([]byte(common.AppProductKeyAES), AppRef.LoadedItems.Data[i].Password)
//		AppRef.LoadedItems.Data[i].AccountName, err = common.EncryptAES([]byte(common.AppProductKeyAES), AppRef.LoadedItems.Data[i].AccountName)
//	}
//	if err != nil {
//		dialog.ShowInformation("err", "encryLoadedData, common.EncryptAES:"+err.Error(), AppRef.W)
//		time.Sleep(time.Millisecond * 5000)
//		go func() {
//			time.Sleep(time.Millisecond * 4800)
//			AppRef.W.Close()
//		}()
//	}
//}
//
//// EditCategory 编辑保存一个归类文件夹
//func EditCategory(e *common.EditForm, editCi Category, editCard *widget.Card) {
//	var newCategory []Category
//	for _, ci := range AppRef.LoadedItems.Category {
//		if ci.Id == editCi.Id {
//			ci.Name = e.Name
//			ci.Alias = e.Alias
//			ci.Description = e.Description
//		}
//		newCategory = append(newCategory, ci)
//	}
//	AppRef.LoadedItems.Category = newCategory
//	// 先加密保存
//	encryLoadedData()
//	marshalDJson, err := json.Marshal(AppRef.LoadedItems)
//	if err != nil {
//		dialog.NewInformation("err", "EditCategory, json.Marshal:"+err.Error(), AppRef.W).Show()
//		return
//	}
//	r, err := common.WriteExistedFile(StoDPath, marshalDJson)
//	if !r {
//		dialog.NewInformation("err", "EditCategory, WriteExistedFile:"+err.Error(), AppRef.W).Show()
//		return
//	}
//	// 保存完后要解密重新贮存至AppRef
//	decLoadedData()
//	// 成功保存本地存储库后再刷新Cart文件夹小部件，避免本地保存失败却事先更新Card小部件文本
//	AppRef.RepaintCartsByEdit(e, editCard)
//	return
//}
//
//// AddCategory 新增一个归类文件夹，但此函数不更新窗口此Cart小部件
//func AddCategory(e *common.EditForm) *Category {
//	var addCategory Category
//	addCategory.Name = e.Name
//	addCategory.Alias = e.Alias
//	addCategory.Description = e.Description
//	addCategory.Renameable = true
//	addCategory.Removable = true
//	r, rank := common.GenAscRankId()
//	if !r {
//		dialog.NewInformation("err", "AddCategory, GenAscRankId", AppRef.W).Show()
//		return nil
//	}
//	addCategory.Rank = rank
//	addCategory.Id = fmt.Sprintf("%d-built-in-can-removed", addCategory.Rank)
//	AppRef.LoadedItems.Category = append(AppRef.LoadedItems.Category, addCategory)
//	encryLoadedData()
//	marshalDJson, err := json.Marshal(AppRef.LoadedItems)
//	if err != nil {
//		dialog.NewInformation("err", "AddCategory, json.Marshal:"+err.Error(), AppRef.W).Show()
//		return nil
//	}
//	r, err = common.WriteExistedFile(StoDPath, marshalDJson)
//	if !r {
//		dialog.NewInformation("err", "AddCategory, WriteExistedFile:"+err.Error(), AppRef.W).Show()
//		return nil
//	}
//	// 保存完后要解密重新贮存至AppRef
//	decLoadedData()
//	return &addCategory
//}
//
//// DeleteCategory 删除一个归类文件夹
//func DeleteCategory(delCi Category, delCard *widget.Card) {
//	var newCategory []Category
//	for _, ci := range AppRef.LoadedItems.Category {
//		if ci.Id != delCi.Id {
//			newCategory = append(newCategory, ci)
//		}
//	}
//	AppRef.LoadedItems.Category = newCategory
//	deleteCategoryRelated(delCi)
//	encryLoadedData()
//	marshalDJson, err := json.Marshal(AppRef.LoadedItems)
//	if err != nil {
//		dialog.NewInformation("err", "DeleteCategory, json.Marshal:"+err.Error(), AppRef.W).Show()
//		return
//	}
//	r, err := common.WriteExistedFile(StoDPath, marshalDJson)
//	if !r {
//		dialog.NewInformation("err", "DeleteCategory, WriteExistedFile:"+err.Error(), AppRef.W).Show()
//		return
//	}
//	// 保存完后要解密重新贮存至AppRef
//	decLoadedData()
//	AppRef.RepaintCartsByRemove(delCard)
//	return
//}
//
//// 删除一个归类文件夹下的所有密码项
//func deleteCategoryRelated(delCi Category) {
//	var newData []Data
//	for _, da := range AppRef.LoadedItems.Data {
//		if da.CategoryId != delCi.Id {
//			newData = append(newData, da)
//		}
//	}
//	AppRef.LoadedItems.Data = newData
//}
//
//// SearchByKeywordTo 按关键词搜索密码项，返回新的LoadedItems副本供部件展示
//func SearchByKeywordTo(kw string) []common.SearchDataResultViewModel {
//	kw = strings.ToLower(kw)
//	var vm []common.SearchDataResultViewModel
//	for _, d := range AppRef.LoadedItems.Data {
//		if strings.Contains(strings.ToLower(d.Name), kw) || strings.Contains(strings.ToLower(d.Remark), kw) ||
//			strings.Contains(strings.ToLower(d.AccountName), kw) || strings.Contains(strings.ToLower(d.Site), kw) {
//			var c common.SearchDataResultViewModel
//			c.VDataAccountName = d.AccountName
//			// 根据CategoryId找归类文件夹名称
//			realCi := GetCategoryByCid(d.CategoryId)
//			c.VDataCategoryName = realCi.Name
//			c.VDataName = d.Name
//			c.VDataPassword = d.Password
//			c.VDataRemark = d.Remark
//			c.VDataSite = d.Site
//			vm = append(vm, c)
//		}
//	}
//	return vm
//}
//
//func GetCategoryByCid(cid string) Category {
//	var realCi Category
//	for _, nci := range AppRef.LoadedItems.Category {
//		if nci.Id == cid {
//			realCi = nci
//		}
//	}
//	return realCi
//}
