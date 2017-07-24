package controllers

import (
	"github.com/astaxie/beego"
	"jenkinsvc/utils/jenkins"
)

type MainController struct {
	beego.Controller
}

func (this *MainController) Get() {
	this.Data["Website"] = "beego.me"
	this.Data["Email"] = "astaxie@gmail.com"
	this.TplName = "index.tpl"
}

func (this *MainController) Test() {
	var err error
	data := make(map[string]interface{})

	data["code"] = 0
	data["data"], err = jenkins.GetJobs()
	if err != nil {
		data["data"] = err
	}
	this.Data["json"] = data
	this.ServeJSON()
}
