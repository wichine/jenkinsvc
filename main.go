package main

import (
	_ "jenkinsvc/routers"
	"github.com/astaxie/beego"
)

func main() {
	beego.Run()
}

