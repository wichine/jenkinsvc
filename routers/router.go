package routers

import (
	"github.com/astaxie/beego"
	"jenkinsvc/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/test", &controllers.MainController{}, "*:Test")
}
