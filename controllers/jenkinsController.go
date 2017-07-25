package controllers

import (
	"encoding/json"
	"github.com/astaxie/beego"
	// "github.com/astaxie/beego/logs"
	"jenkinsvc/models"
	"jenkinsvc/utils/jenkins"
)

type JenkinsController struct {
	beego.Controller
}

func init() {
	beego.BConfig.CopyRequestBody = true
}

func (this *JenkinsController) GetJobs() {
	var err error
	data := make(map[string]interface{})

	data["code"] = 0
	data["data"], err = jenkins.GetJobs()
	if err != nil {
		this.handleError(500, err.Error())
		return
	}
	this.Data["json"] = data
	this.ServeJSON()
}

func (this *JenkinsController) CallJob() {
	var err error
	data := make(map[string]interface{})
	data["code"] = 0
	data["msg"] = "ok"

	job := &models.Job{}
	err = json.Unmarshal(this.Ctx.Input.RequestBody, job)
	if err != nil {
		this.handleError(500, err.Error())
		return
	}
	err = jenkins.CallJob(job.Name)
	if err != nil {
		this.handleError(500, err.Error())
		return
	}
	this.Data["json"] = data
	this.ServeJSON()
}

func (this *JenkinsController) handleError(code int, msg string) {
	data := make(map[string]interface{})
	data["code"] = code
	data["msg"] = msg
	this.Data["json"] = data
	this.ServeJSON()
	this.StopRun()
}
