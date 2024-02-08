// Package storagedata 贮存密码箱数据，加载、保存本地存储库
package storagedata

import (
	"desktop/common"
	"encoding/json"
	"errors"
	"fmt"
)

var StoDPath string
var loadedItems *LoadedItems

// LoadInit 初始化載入本地存储库數據文件
func LoadInit(data []byte, dto PassDto) (*LoadedItems, error) {
	// 若用户主目录不存在则先创建
	if !common.Existed(common.AppDataDir()) {
		b, err := common.CreateDir(common.AppDataDir())
		if !b {
			dto.ErrorMsg = "storage loadInit, CreateDir: " + err.Error()
			fmt.Println(dto.ErrorMsg)
			return nil, errors.New(dto.ErrorMsg)
		}
	}
	StoDPath = common.DPath
	// 用户本机不存在默认数据文件，则创建
	if !common.Existed(StoDPath) {
		r, err := common.CreateFile(StoDPath, data)
		if !r {
			dto.ErrorMsg = "storage loadInit, CreateFile: " + err.Error()
			fmt.Println(dto.ErrorMsg)
			return nil, errors.New(dto.ErrorMsg)
		}
	}
	return load(StoDPath, dto)
}

// 从本地存储库d.json加载密码数据
func load(stoDPath string, dto PassDto) (*LoadedItems, error) {
	r, bs, err := common.ReadFileAsBytes(stoDPath)
	if !r {
		dto.ErrorMsg = "storage load, ReadFileAsString:" + err.Error()
		fmt.Println(dto.ErrorMsg)
		return nil, errors.New(dto.ErrorMsg)
	}
	err = json.Unmarshal(bs, &loadedItems)
	if err != nil {
		dto.ErrorMsg = "storage load, json.Marshal d:" + err.Error()
		fmt.Println(dto.ErrorMsg)
		return nil, errors.New(dto.ErrorMsg)
	}
	fmt.Println("load")
	fmt.Println(loadedItems.Preferences)
	// 解密密码项
	return decLoadedData(dto)
}

// 解密所有密码项
func decLoadedData(dto PassDto) (*LoadedItems, error) {
	var err error
	// 若启动密码是空的，但却存在密码项 说明有人篡改了本地数据文件！直接错误返回给前端
	if common.IsWhiteAndSpace(loadedItems.Preferences.LockPwd) && (len(loadedItems.Data) > 0 || len(loadedItems.Category) > 5) {
		dto.ErrorMsg = "安全验证失败！检测到Pasecret数据文件被篡改！\n" +
			"请不要篡改配置文件启动密码！若您忘记了启动密码，" +
			"很遗憾，您无法访问数据！" +
			"Security verification failed!\n" +
			" Tampering of Pasecret data file detected! \n " +
			"Please do not tamper with the configuration file startup password! " +
			"If you forget the startup password, Unfortunately, you cannot access the data!"
		fmt.Println(dto.ErrorMsg)
		return nil, errors.New(dto.ErrorMsg)
	} else {
		//  用启动密码专属密钥 先解密启动密码为明文 空则跳过(正常第一次启动还未设置启动密码的情况)
		if !common.IsWhiteAndSpace(loadedItems.Preferences.LockPwd) {
			loadedItems.Preferences.LockPwd, err = common.DecryptAES([]byte(common.AppStartPwdKeyAES), loadedItems.Preferences.LockPwd)
			if err != nil {
				dto.ErrorMsg = "dec LoadedData LockPwd, common.DecryptAES:" + err.Error()
				fmt.Println(dto.ErrorMsg)
				return nil, errors.New(dto.ErrorMsg)
			}
			// 再用启动密码明文搭配的密码项密钥 解密所有密码项
			for i := 0; i < len(loadedItems.Data); i++ {
				loadedItems.Data[i].Name, err = common.DecryptAES([]byte(common.GetDataKeyAES(loadedItems.Preferences.LockPwd)), loadedItems.Data[i].Name)
				loadedItems.Data[i].Site, err = common.DecryptAES([]byte(common.GetDataKeyAES(loadedItems.Preferences.LockPwd)), loadedItems.Data[i].Site)
				loadedItems.Data[i].Remark, err = common.DecryptAES([]byte(common.GetDataKeyAES(loadedItems.Preferences.LockPwd)), loadedItems.Data[i].Remark)
				loadedItems.Data[i].Password, err = common.DecryptAES([]byte(common.GetDataKeyAES(loadedItems.Preferences.LockPwd)), loadedItems.Data[i].Password)
				loadedItems.Data[i].AccountName, err = common.DecryptAES([]byte(common.GetDataKeyAES(loadedItems.Preferences.LockPwd)), loadedItems.Data[i].AccountName)
			}
			if err != nil {
				dto.ErrorMsg = "dec LoadedData, common.DecryptAES:" + err.Error()
				fmt.Println(dto.ErrorMsg)
				return nil, errors.New(dto.ErrorMsg)
			}
		}
		return loadedItems, nil
	}
}

// EncryLoadedData 加密所有密码项再保存至本地存储库
func EncryLoadedData(data LoadedItems) error {
	var err error
	if common.IsWhiteAndSpace(data.Preferences.LockPwd) {
		// 若启动密码不是空的，说明有人篡改了本地数据文件！直接错误返回给前端
		if len(loadedItems.Data) > 0 {
			msg := "安全验证失败！检测到Pasecret数据文件被篡改！\n" +
				"请不要篡改配置文件启动密码！若您忘记了启动密码，" +
				"很遗憾，您无法访问数据！" +
				"Security verification failed!\n" +
				" Tampering of Pasecret data file detected! \n " +
				"Please do not tamper with the configuration file startup password! " +
				"If you forget the startup password, Unfortunately, you cannot access the data!"
			return errors.New(msg)
		}
	}
	s := ""
	// 先用前端设置过来的明文启动密码搭配密码项密钥 加密所有密码项
	for i := 0; i < len(data.Data); i++ {
		data.Data[i].Name, err = common.EncryptAES([]byte(common.GetDataKeyAES(data.Preferences.LockPwd)), data.Data[i].Name)
		data.Data[i].Site, err = common.EncryptAES([]byte(common.GetDataKeyAES(data.Preferences.LockPwd)), data.Data[i].Site)
		data.Data[i].Remark, err = common.EncryptAES([]byte(common.GetDataKeyAES(data.Preferences.LockPwd)), data.Data[i].Remark)
		data.Data[i].Password, err = common.EncryptAES([]byte(common.GetDataKeyAES(data.Preferences.LockPwd)), data.Data[i].Password)
		data.Data[i].AccountName, err = common.EncryptAES([]byte(common.GetDataKeyAES(data.Preferences.LockPwd)), data.Data[i].AccountName)
	}
	if err != nil {
		s = "err EncryLoadedData, common.EncryptAES:" + err.Error()
		return errors.New(s)
	}
	//  再用启动密码密钥加密启动密码
	data.Preferences.LockPwd, err = common.EncryptAES([]byte(common.AppStartPwdKeyAES), data.Preferences.LockPwd)

	marshalDJson, err := json.Marshal(data)
	if err != nil {
		s = "err EncryLoadedData, json.Marshal:" + err.Error()
		return errors.New(s)
	}
	r, err := common.WriteExistedFile(StoDPath, marshalDJson)
	if !r {
		return errors.New(s)
	}
	return nil
}
