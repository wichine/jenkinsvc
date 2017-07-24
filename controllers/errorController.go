package controllers

import (
	"github.com/astaxie/beego"
)

type ErrorController struct {
	beego.Controller
}

func (c *ErrorController) Error404() {
	c.Ctx.Output.SetStatus(404)
	result := map[string]interface{}{"code": 404, "msg": "page not found"}
	c.Data["json"] = result
	c.ServeJSON()
	c.StopRun()
}

func (c *ErrorController) Error500() {
	c.Ctx.Output.SetStatus(500)
	result := map[string]interface{}{"code": 500, "msg": "server error"}
	c.Data["json"] = result
	c.ServeJSON()
	c.StopRun()
}

func (c *ErrorController) Error501() {
	c.Ctx.Output.SetStatus(501)
	result := map[string]interface{}{"code": 501, "msg": "server error"}
	c.Data["json"] = result
	c.ServeJSON()
	c.StopRun()
}

func (c *ErrorController) Error503() {
	c.Ctx.Output.SetStatus(503)
	result := map[string]interface{}{"code": 503, "msg": "server error"}
	c.Data["json"] = result
	c.ServeJSON()
	c.StopRun()
}
