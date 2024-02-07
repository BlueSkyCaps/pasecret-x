package main

import (
	"desktop/storagedata"
	"embed"
	"fmt"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
//go:embed all:assets
var assets embed.FS

var passDto storagedata.PassDto

func init() {
	var err error
	// 获取默认数据文件
	resourceDJson, err := assets.ReadFile("assets/d.json")
	if err != nil {
		// 发生异常，贮存错误信息后续让前端首先判断显示
		passDto.ErrorMsg = "Failed to read d.json resource in init: " + err.Error()
		fmt.Println(passDto.ErrorMsg)
		return
	}
	passDto.LoadedItems, err = storagedata.LoadInit(resourceDJson, passDto)
	if err != nil {
		passDto.ErrorMsg = err.Error()
		return
	}
}

func main() {
	// Create an instance of the app structure
	app := NewApp()
	// Create application with options
	err := wails.Run(&options.App{
		Title:  "PasecretX",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
