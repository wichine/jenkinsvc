package models

import (
	"github.com/astaxie/beego/orm"
)

type Project struct {
	Title       string `orm:"pk" json:"title"`
	Description string `json:"description"`
}

type Version struct {
	VersionNumber string `orm:"pk";"column(version)" json:"version"`
	PackTime      string `json:"packTime"`
	Status        string `json:"status"`
	Action        string `json:"action"`
	Description   string `json:"description"`
}

func init() {
	orm.RegisterModel(new(Project))
	orm.RegisterModel(new(Version))
}
