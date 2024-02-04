package main

import (
	"context"
	"desktop/storagedata"
	"errors"
	"fmt"
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

// LoadedItemsUpdate 存储更新归类夹和密码数据到本地，由前端调用
func (a *App) LoadedItemsUpdate(data *storagedata.LoadedItems) error {
	fmt.Println("执行LoadedItemsUpdate")
	if data == nil {
		return errors.New("data is null or empty")
	}
	// --dup start 在引用加密更新之前，创建副本给全局变量，否则前端访问全局变量 得到的是引用传递的过后的加密数据
	tmp := new(storagedata.LoadedItems)
	for _, i2 := range data.Data {
		tmp.Data = append(tmp.Data, i2)
	}
	for _, i2 := range data.Category {
		tmp.Category = append(tmp.Category, i2)
	}
	// -- dup end

	err := storagedata.EncryLoadedData(*data)
	if err == nil {
		// 更新成功后，别忘了将数据存储到全局变量中，因为前端调用访问的是全局变量
		passDto.LoadedItems = *tmp
		fmt.Println(tmp)
	}
	return err
}
