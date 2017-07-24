package routers

import (
	"github.com/astaxie/beego"
	"jenkinsvc/controllers"
)

func init() {
	beego.ErrorController(&controllers.ErrorController{})
	beego.Router("/", &controllers.MainController{})
	beego.Router("/jenkins/getjobs", &controllers.JenkinsController{}, "*:GetJobs")
}
