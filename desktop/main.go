package main

import (
	"desktop/common"
	"desktop/preferences"
	"desktop/storagedata"
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"os"
)

//go:embed all:frontend/dist
//go:embed all:assets
var assets embed.FS
var passDto storagedata.PassDto

func initFirst() {
	var err error
	// 获取首选项中的当前语言
	passDto.Preferences.LocalLang = preferences.GetPreferenceByLocalLang()
	resourceDJson, err := assets.ReadFile("assets/d.json")
	if err != nil {
		println("Failed to read d.json resource in init:", err.Error())
		os.Exit(1)
		return
	}
	passDto.LoadedItems = storagedata.LoadInit(resourceDJson)
	// 获取锁屏密码
	passDto.Preferences.LockPwd = preferences.GetPreferenceByLockPwd()
	// 非空则解密
	if !common.IsWhiteAndSpace(passDto.Preferences.LockPwd) {
		aes, err := common.DecryptAES([]byte(common.AppProductKeyAES), passDto.Preferences.LockPwd)
		if err != nil {
			passDto.Preferences.LockPwd = aes
		}
	}
	//passDto.Preferences.LockPwd = "1233"

}

func main() {
	initFirst()
	// Create an instance of the app structure
	app := NewApp()
	// Create application with options
	err := wails.Run(&options.App{
		Title:  "PasecretX - 密码管理",
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
