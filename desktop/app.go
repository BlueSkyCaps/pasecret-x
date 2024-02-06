package main

import (
	"context"
	"desktop/common"
	"desktop/preferences"
	"desktop/storagedata"
	"errors"
	"fmt"
	"github.com/jinzhu/copier"
	"github.com/wailsapp/wails/v2/pkg/runtime"
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
	runtime.WindowSetMinSize(ctx, 1000, 700)
}

// DtoJsonFirst 获取第一次启动时存储的json数据，由前端调用
func (a *App) DtoJsonFirst() storagedata.PassDto {
	fmt.Println("执行DtoJsonFirst")
	return passDto
}

// LoadedItemsUpdate 存储更新整个归类夹和密码数据到本地，由前端调用
func (a *App) LoadedItemsUpdate(data *storagedata.LoadedItems) error {
	fmt.Println("执行LoadedItemsUpdate")
	if data == nil {
		return errors.New("data is null or empty")
	}
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
		passDto.LoadedItems = *tmp
	}
	return err
}

// PreferencesUpdate 存储更新整个首选项，由前端调用
func (a *App) PreferencesUpdate(preference *preferences.Preferences) error {
	fmt.Println("执行PreferencesUpdate")
	if preference == nil {
		return errors.New("preference is null or empty")
	}
	purePwd := preference.LockPwd
	if preference.LockPwd != "" {
		var err error
		println("密码：", preference.LockPwd)
		// 加密启动密码
		preference.LockPwd, err = common.EncryptAES([]byte(common.AppProductKeyAES), preference.LockPwd)
		println("加密码：", preference.LockPwd)

		if err != nil {
			return err
		}
	}
	// 更新存储到本地
	err := preferences.OverwritePreference(preference)
	if err == nil {
		// 更新成功后，别忘了将数据存储到全局变量中，因为前端调用访问的是全局变量
		passDto.Preferences = *preference
		// 再覆盖明文启动密码贮存到全局变量中，避免给前端是加密的启动密码
		passDto.Preferences.LockPwd = purePwd
	}
	return err
}
