package main

import (
	"context"
	"desktop/storagedata"
	"errors"
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
	return passDto
}

func (a *App) GetLockPwdFirst() string {
	return passDto.Preferences.LockPwd
}

func (a *App) GetLocalLangFirst() string {
	return passDto.Preferences.LocalLang
}

// LoadedItemsUpdate 存储更新归类夹和密码数据到本地，由前端调用
func (a *App) LoadedItemsUpdate(data *storagedata.LoadedItems) error {
	if data == nil {
		return errors.New("data is null or empty")
	}
	err := storagedata.EncryLoadedData(*data)
	if err == nil {
		// 更新成功后，别忘了将数据存储到全局变量中，因为前端调用访问的是全局变量
		passDto.LoadedItems = *data
	}
	return err
}
