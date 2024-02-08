// Package common 共用函数
package common

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"runtime"
	"strings"
)

var DPath = filepath.Join(AppDataDir(), "d.json")

func AppDataDir() string {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		fmt.Println("无法获取用户主目录:", err)
		return ""
	}
	if runtime.GOOS == "windows" {
		// 拼接得到 AppData 目录的完整路径
		return filepath.Join(homeDir, "AppData", "Roaming", "pasecret-x")
	} else {
		// linux 和 macOS 下的 目录路径
		return filepath.Join(homeDir, ".config", "pasecret-x")
	}
}

// Existed 目录或文件是否存在
func Existed(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}

// CreateDir 创建路径中的目录
func CreateDir(path string) (bool, error) {
	err := os.MkdirAll(path, os.ModePerm)
	if err == nil {
		return true, nil
	}
	return false, err
}

// CreateFile 创建路径文件，并可写入文件数据
func CreateFile(path string, data []byte) (bool, error) {
	// Android必须添加os.O_WRONLY，否则报"bad file descriptor"权限问题
	create, err := os.OpenFile(path, os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if err != nil {
		return false, err
	}
	_, err = create.Write(data)
	if err != nil {
		create.Close()
		return false, err
	}
	err = create.Close()
	if err != nil {
		return false, err
	}
	return true, nil
}

// WriteExistedFile 已有路径文件覆盖写入数据
func WriteExistedFile(path string, data []byte) (bool, error) {
	// Android必须添加os.O_WRONLY，否则报"bad file descriptor"权限问题
	create, err := os.OpenFile(path, os.O_TRUNC|os.O_WRONLY, os.ModePerm)
	if err != nil {
		return false, err
	}
	_, err = create.Write(data)
	if err != nil {
		create.Close()
		return false, err
	}
	err = create.Close()
	if err != nil {
		return false, err
	}
	return true, nil
}

// ReadFileAsString 从路径文件读全部数据，字符串形式
func ReadFileAsString(path string) (bool, string, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return false, "", err
	}
	return true, string(b), nil
}

// ReadFileAsBytes 从路径文件读全部数据，byte形式
func ReadFileAsBytes(path string) (bool, []byte, error) {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		return false, nil, err
	}
	return true, b, nil

}

func IsWhiteAndSpace(s string) bool {
	return strings.TrimSpace(s) == ""
}
