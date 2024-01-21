package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		fmt.Println("无法获取用户主目录:", err)
		return
	}

	// 拼接得到 AppData 目录的完整路径
	appDataDir := filepath.Join(homeDir, "AppData", "Roaming", "pasecret-x")

	fmt.Println("AppData 目录:", appDataDir)
}
