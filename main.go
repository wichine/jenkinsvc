package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"jenkinsvc/models"
	_ "jenkinsvc/routers"
)

func main() {
	setupLog()
	models.InitDB()
	beego.Run()
}

func setupLog() {
	logs.EnableFuncCallDepth(true)
	logs.SetLogFuncCallDepth(3)
	logLevel := beego.AppConfig.String("LogLevel")
	switch logLevel {
	case "debug", "Debug":
		logs.Info("log level: Debug")
		logs.SetLevel(logs.LevelDebug)
	case "info", "Info":
		logs.Info("log level: Info")
		logs.SetLevel(logs.LevelInfo)
	case "warn", "warning", "Warn", "Warning":
		logs.Info("log level: Warn")
		logs.SetLevel(logs.LevelWarn)
	case "error", "Error":
		logs.Info("log level: Error")
		logs.SetLevel(logs.LevelError)
	case "critical", "Critical":
		logs.Info("log level: Critical")
		logs.SetLevel(logs.LevelCritical)
	default:
		logs.Info("log level: deault to Info")
		logs.SetLevel(logs.LevelInfo)
	}
}
