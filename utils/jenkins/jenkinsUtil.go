package jenkins

import (
	// "encoding/json"
	// "fmt"
	"github.com/astaxie/beego"
	// "github.com/astaxie/beego/httplib"
	"github.com/astaxie/beego/logs"
	"github.com/bndr/gojenkins"
	"jenkinsvc/models"
	// "strings"
)

var (
	jenkins *gojenkins.Jenkins
)

func init() {
	var err error
	userid := beego.AppConfig.String("jenkins::userid")
	if userid == "" {
		panic(`userid not set in [jenkins] section!`)
	}
	token := beego.AppConfig.String("jenkins::token")
	if token == "" {
		panic(`token not set in [jenkins] section!`)
	}
	host := beego.AppConfig.String("jenkins::host")
	if host == "" {
		panic(`host not set in [jenkins] section!`)
	}
	jenkins, err = gojenkins.CreateJenkins(host, userid, token).Init()
	if err != nil {
		panic(err.Error())
	}
}

func GetJobs() ([]*models.Job, error) {
	_jobs, err := jenkins.GetAllJobs()
	if err != nil {
		logs.Error(err)
	}
	jobs := []*models.Job{}
	for i, _ := range _jobs {
		jobs = append(jobs, &models.Job{
			Name:  _jobs[i].Raw.Name,
			Url:   _jobs[i].Raw.URL,
			Color: _jobs[i].Raw.Color,
		})
	}
	return jobs, err
}

func CallJob(jobName string) error {
	_, err := jenkins.BuildJob(jobName)
	if err != nil {
		logs.Error(err)
	}
	return err
}
