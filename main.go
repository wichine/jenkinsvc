package main

import (
	"github.com/astaxie/beego"
	"jenkinsvc/models"
	_ "jenkinsvc/routers"
)

func main() {
	models.InitDB()
	beego.Run()
}
