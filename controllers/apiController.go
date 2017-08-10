package controllers

import (
	"encoding/json"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"jenkinsvc/models"
	"jenkinsvc/services"
)

type ApiController struct {
	beego.Controller
}

func init() {
	beego.BConfig.CopyRequestBody = true
}

func (this *ApiController) GetProjects() {
	var err error
	projects, err := services.GetAllProjects()
	if err != nil {
		this.handleError(500, err.Error())
		return
	}
	result := make(map[string]interface{})
	result["code"] = 0
	result["data"] = projects
	this.Data["json"] = result
	this.ServeJSON()
}

func (this *ApiController) AddProject() {
	newProject := &models.Project{}
	err := json.Unmarshal(this.Ctx.Input.RequestBody, newProject)
	if err != nil {
		logs.Error(err)
		this.handleError(500, err.Error())
		return
	}
	err = services.AddProject(newProject)
	if err != nil {
		logs.Error(err)
		this.handleError(500, err.Error())
		return
	}
	projects, err := services.GetAllProjects()
	if err != nil {
		logs.Error(err)
		this.handleError(500, err.Error())
		return
	}
	result := make(map[string]interface{})
	result["code"] = 0
	result["data"] = projects
	this.Data["json"] = result
	this.ServeJSON()
}

func (this *ApiController) handleError(code int, msg string) {
	result := make(map[string]interface{})
	result["code"] = code
	result["msg"] = msg
	this.Data["json"] = result
	this.ServeJSON()
	this.StopRun()
}
