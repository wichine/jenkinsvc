package models

import (
	"github.com/astaxie/beego/orm"
)

type Job struct {
	Name  string `orm:"pk" json:"name"`
	Url   string `json:"url"`
	Color string `json:"color"`
}

func init() {
	orm.RegisterModel(new(Job))
}
