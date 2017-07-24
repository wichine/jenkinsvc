package controllers

import (
	"github.com/astaxie/beego"
	"jenkinsvc/utils/jenkins"
)

type JenkinsController struct {
	beego.Controller
}

func (this *JenkinsController) GetJobs() {
	var err error
	data := make(map[string]interface{})

	data["code"] = 0
	data["data"], err = jenkins.GetJobs()
	if err != nil {
		data["code"] = 500
		data["msg"] = err
	}
	this.Data["json"] = data
	this.ServeJSON()
}
