package routers

import (
	"github.com/astaxie/beego"
	"jenkinsvc/controllers"
)

func init() {
	beego.ErrorController(&controllers.ErrorController{})
	beego.Router("/", &controllers.MainController{})
	beego.Router("/jenkins/getjobs", &controllers.JenkinsController{}, "get:GetJobs")
	beego.Router("/jenkins/calljob", &controllers.JenkinsController{}, "post:CallJob")

	beego.Router("/api/getprojects", &controllers.ApiController{}, "get:GetProjects")
	beego.Router("/api/addproject", &controllers.ApiController{}, "post:AddProject")
}
