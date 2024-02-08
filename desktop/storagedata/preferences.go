package storagedata

import (
	"desktop/common"
	"encoding/json"
	"os"
)

func GetPreferenceByLockPwd() string {
	preference := readPreference()
	return (*preference).LockPwd
}

func GetPreferenceByLocalLang() string {
	preference := readPreference()
	return (*preference).LocalLang
}

func readPreference() *Preferences {
	r, bs, err := common.ReadFileAsBytes(common.DPath)
	if !r {
		println("err", "readPreference,ReadFileAsBytes:"+err.Error())
		os.Exit(1)
	}
	loadedItems := LoadedItems{}
	err = json.Unmarshal(bs, &loadedItems)
	if err != nil {
		println("err", "readPreference, json.Marshal d:"+err.Error())
		os.Exit(1)
		return nil
	}
	return &loadedItems.Preferences
}
