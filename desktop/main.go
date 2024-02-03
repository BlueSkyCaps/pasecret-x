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

func init() {
	var err error
	//var enTomlResource []byte
	//// 从embed读取打包的语言文件字节数据
	//enTomlResource, err = assets.ReadFile("assets/pasecret.en.toml")
	//zhTomlResource, err := assets.ReadFile("assets/pasecret.zh.toml")
	//if enTomlResource == nil || err != nil {
	//	println("Failed to read i18n resource in init:", err.Error())
	//	os.Exit(1)
	//	return
	//}
	//pi18n.Local12Init(enTomlResource, zhTomlResource)
	// 获取首选项中的当前语言
	passDto.Preferences.LocalLang = preferences.GetPreferenceByLocalLang()
	// 初始化本地存储库 必须再语言本地化Local12Init()后面调用
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
	passDto.Preferences.LockPwd = "1233"

}

func main() {
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
