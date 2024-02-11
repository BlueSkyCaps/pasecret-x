package main

import (
	"context"
	"desktop/common"
	"desktop/storagedata"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/jinzhu/copier"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved,
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	// 设置最小窗口大小
	runtime.WindowSetMinSize(a.ctx, 1040, 650)
}

// DtoJsonFirst 获取第一次启动时存储的json数据，由前端调用
func (a *App) DtoJsonFirst() storagedata.PassDto {
	fmt.Println("执行DtoJsonFirst")
	return passDto
}

// LoadedItemsUpdate 存储更新整个数据到本地，由前端调用
func (a *App) LoadedItemsUpdate(data *storagedata.LoadedItems) error {
	if data == nil {
		return errors.New("data is null or empty")
	}
	fmt.Println("执行LoadedItemsUpdate")
	fmt.Printf("%+v\n", *data)
	// --dup start 在引用加密更新之前，创建副本给全局变量，否则前端访问全局变量 得到的是引用传递的过后的加密数据
	tmp := new(storagedata.LoadedItems)
	err := copier.CopyWithOption(tmp, data, copier.Option{DeepCopy: true})
	if err != nil {
		return err
	}
	// -- dup end
	// 加密更新存储到本地
	err = storagedata.EncryLoadedData(*data)
	if err == nil {
		// 更新成功后，别忘了将数据存储到全局变量中，因为前端调用访问的是全局变量
		passDto.LoadedItems = tmp
	} else {
		fmt.Println(err.Error())
	}
	return err
}

// Exited 主动退出程序，由前端调用
func (a *App) Exited() {
	fmt.Println("执行Exited")
	os.Exit(0)
}

// ReloadOpenFileDialog 打开文件选择对话框，用户选择数据文件后还原数据，由前端调用
func (a *App) ReloadOpenFileDialog() error {
	fmt.Println("执行ReloadOpenFileDialog")
	path, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title:           "选择数据文件还原/select file to reload",
		DefaultFilename: "pasecret-dumped.px",
		Filters: []runtime.FileFilter{
			{DisplayName: "Pasecret file", Pattern: "*.px"},
		},
	})
	if err != nil {
		return err
	}
	if common.IsWhiteAndSpace(path) {
		// 用戶取消了對話框 生成一个不是错误的错误标识给前端判断 返回nil或者空字符代表没有错误，js-catch无法捕获
		return errors.New("_")
	}

	r, bytes, err := common.ReadFileAsBytes(path)
	if !r {
		return errors.New("致命错误！还原失败，请尝试重试。\n" +
			"Fatal error! Restore failed, please close and try again." + err.Error())
	}
	var reloadData storagedata.LoadedItems
	// 将读出的文件反序列化为数据文件结构体
	err = json.Unmarshal(bytes, &reloadData)
	if err != nil {
		return errors.New("还原失败，不是有效的Pasecret数据文件！\n" +
			"Restore failed, not a valid Pasecret data file!" + err.Error())
	}
	// 用还原的数据覆盖本机数据文件
	r, err = common.WriteExistedFile(common.DPath, bytes)
	if !r {
		return errors.New("致命错误！还原失败，请尝试重试。\n" +
			"Fatal error! Restore failed, please close and try again." + err.Error())
	}
	// 重新执行载入数据，如解密，相当于重新启动
	initFirst()
	return nil
}

// BackupSaveFileDialog 打开保存文件对话框，用户选择数据文件备份的目录，由前端调用
func (a *App) BackupSaveFileDialog() error {
	fmt.Println("DumpSaveFileDialog")
	path, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "选择备份目录/select backup location",
		DefaultFilename: "pasecret-dumped.px",
		Filters: []runtime.FileFilter{
			{DisplayName: "Pasecret file", Pattern: "*.px"},
		},
	})
	if err != nil {
		return err
	}
	if common.IsWhiteAndSpace(path) {
		// 用戶取消了對話框 生成一个不是错误的错误标识给前端判断
		return errors.New("_")
	}
	// 从本机读取数据文件
	r, bytes, err := common.ReadFileAsBytes(common.DPath)
	if !r {
		return errors.New("致命错误！备份失败，请尝试重试。\n" +
			"Fatal error! backup failed, please close and try again." + err.Error())
	}
	// 用本机数据在用户选择的路径创建备份文件
	r, err = common.CreateFile(path, bytes)
	if !r {
		return errors.New("致命错误！备份失败，请尝试重试。\n" +
			"Fatal error! backup failed, please close and try again." + err.Error())
	}
	return nil
}

// OpenBrowserUri 打开浏览器并访问指定链接，由前端调用
func (a *App) OpenBrowserUri(uri string) {
	runtime.BrowserOpenURL(a.ctx, uri)
}
