// Package preferences 加载首选项配置，如启动密码。不使用fyne的preferences提供的方法，因为在安卓端存储失败
package preferences

import (
	"desktop/common"
	"encoding/json"
	"errors"
	"os"
	"reflect"
)

type Preferences struct {
	LockPwd    string `json:"lockPwd"`
	LocalLang  string `json:"localLang"`
	SyncBranch int    `json:"sync_branch"`
}

var preferencePath string

func GetPreferenceByLockPwd() string {
	PreferenceInit()
	preference := readPreference()
	return (*preference).LockPwd
}

func GetPreferenceByLocalLang() string {
	PreferenceInit()
	preference := readPreference()
	return (*preference).LocalLang
}

func PreferenceInit() {
	// 若用户主目录不存在则先创建
	if !common.Existed(common.AppDataDir()) {
		b, err := common.CreateDir(common.AppDataDir())
		if !b {
			println("err", "PreferenceInit, CreateDir:"+err.Error())
			os.Exit(1)
			return
		}
	}
	preferencePath = common.Preference_path
	// 不存在首选项文件，则创建
	if !common.Existed(preferencePath) {
		initPre := Preferences{}
		marshal, err := json.Marshal(initPre)
		if err != nil {
			println("err", "PreferenceInit, json.Marshal:"+err.Error())
			os.Exit(1)
			return
		}
		r, err := common.CreateFile(preferencePath, marshal)
		if !r {
			println("err", "PreferenceInit, CreateFile:"+err.Error())
			os.Exit(1)
			return
		}
	}
}
func readPreference() *Preferences {
	r, bs, err := common.ReadFileAsBytes(preferencePath)
	if !r {
		println("err", "readPreference,ReadFileAsBytes:"+err.Error())
		os.Exit(1)
	}
	preference := Preferences{}
	err = json.Unmarshal(bs, &preference)
	if err != nil {
		println("err", "readPreference, json.Marshal d:"+err.Error())
		os.Exit(1)
		return nil
	}
	return &preference
}

// SetPreference 设置首选项Preferences某个键的值，注意fieldName是结构体字段名而不是json文件实际存储的key键名
func SetPreference(fieldName string, v interface{}) {
	PreferenceInit()
	preference := readPreference()
	preferenceR := reflect.ValueOf(preference)
	keyNameR := preferenceR.Elem().FieldByName(fieldName)
	if !reflect.ValueOf(v).Type().AssignableTo(keyNameR.Type()) {
		println("err", "AssignableTo, v ref cant assignable to keyNameR")
		os.Exit(1)
		return
	}
	keyNameR.Set(reflect.ValueOf(v))
	marshal, err := json.Marshal(preference)
	if err != nil {
		println("err", "SetPreferenceByLockPwd, json.Marshal:"+err.Error())
		os.Exit(1)
		return
	}
	r, err := common.WriteExistedFile(preferencePath, marshal)
	if !r {
		println("err", "SetPreferenceByLockPwd, WriteExistedFile:"+err.Error())
		os.Exit(1)
		return
	}
}

func RemovePreference(key string) {
	preference := readPreference()
	preferenceR := reflect.ValueOf(preference)
	keyNameR := preferenceR.Elem().FieldByName(key)
	if keyNameR.IsZero() {
		println("err", "RemovePreferenceBy, key ref is zero")
		os.Exit(1)
		return
	}
	keyNameR.Set(reflect.Zero(keyNameR.Type()))
	marshal, err := json.Marshal(preference)
	if err != nil {
		println("err", "RemovePreferenceByLockPwd, json.Marshal:"+err.Error())
		os.Exit(1)
		return
	}
	r, err := common.WriteExistedFile(preferencePath, marshal)
	if !r {
		println("err", "RemovePreferenceByLockPwd, WriteExistedFile:"+err.Error())
		os.Exit(1)
		return
	}
}

// OverwritePreference 根据整个首选项Preferences覆盖更新
func OverwritePreference(preferences *Preferences) error {
	marshal, err := json.Marshal(preferences)
	if err != nil {

		return errors.New("OverwritePreference, json.Marshal:" + err.Error())
	}
	r, err := common.WriteExistedFile(preferencePath, marshal)
	if !r {
		return errors.New("OverwritePreference, WriteExistedFile:" + err.Error())
	}
	return nil
}
