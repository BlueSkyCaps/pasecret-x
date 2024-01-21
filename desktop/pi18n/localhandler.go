package pi18n

// 根据首选项配置加载中文/英文本地化文本

import (
	"desktop/common"
	"desktop/preferences"
	"github.com/BurntSushi/toml"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
	"os"
)

var localize *i18n.Localizer
var localFilePath string
var Lang string

// Local12Init 不存在本地化文本文件则创建，并且初始化本地语言环境。
func Local12Init(enToml []byte, zhToml []byte) {
	// 获取首选项中的当前语言
	Lang = preferences.GetPreferenceByLocalLang()
	// 如果为空，则是首次安装打开，默认显示中文
	var localFileBytes []byte
	if common.IsWhiteAndSpace(Lang) || Lang == "zh" {
		localFilePath = common.I18n_zh_path
		Lang = "zh"
		localFileBytes = zhToml
	} else if Lang == "en" {
		localFilePath = common.I18n_en_path
		localFileBytes = enToml
	}
	// 不存在当前语言本地化文件，则创建
	if !common.Existed(localFilePath) {
		r, err := common.CreateFile(localFilePath, localFileBytes)
		if !r {
			println("err", "Local12Init, CreateFile:\n"+err.Error())
			os.Exit(1)
			return
		}
	}
	initLocalize(Lang)
}

// 配置当前全局语言环境
func initLocalize(lang string) {
	// 创建Bundle
	bundle := i18n.NewBundle(language.Chinese)
	// 注册解析器
	bundle.RegisterUnmarshalFunc("toml", toml.Unmarshal)
	// 加载当前语言文件
	_, err := bundle.LoadMessageFile(localFilePath)
	if err != nil {
		println("err", "initLocalize, LoadMessageFile:\n"+err.Error())
		os.Exit(1)
	}
	localize = i18n.NewLocalizer(bundle, lang)
}

// LocalizedText 获取本地化文本
func LocalizedText(messageId string, tmd map[string]interface{}) string {
	i := i18n.LocalizeConfig{}
	if tmd != nil {
		i = i18n.LocalizeConfig{
			MessageID:    messageId,
			TemplateData: tmd,
		}
	} else {
		i = i18n.LocalizeConfig{
			MessageID: messageId,
		}
	}
	translation, err := localize.Localize(&i)
	if err != nil {
		println("err", "LocalizedText, Localize:\n"+err.Error())
		os.Exit(1)
	}
	return translation
}
