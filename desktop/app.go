package main

import (
	"context"
	"desktop/storagedata"
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

func (a *App) DtoJsonFirst() storagedata.PassDto {
	return storagedata.PassDto{Lang: lang, LoadedItems: loadedItems}
}
