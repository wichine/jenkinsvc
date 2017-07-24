package jenkins

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/httplib"
	"github.com/astaxie/beego/logs"
	"strings"
)

type Job struct {
	Class string `json:"_class"`
	Name  string `json:"name"`
	Url   string `json:"url"`
	Color string `json:"color"`
}

func GetJobs() ([]*Job, error) {
	apiUrl := fmt.Sprintf(`%s%s`, getJenkinsHost(), `api/json`)
	req := httplib.Get(apiUrl)
	setAuthorization(req)

	res, err := req.String()
	if err != nil {
		logs.Error(err)
		return nil, err
	}
	logs.Debug("Get api url(%s) returns:", apiUrl, res)
	type tempStruct struct {
		Jobs []*Job `json:"jobs"`
	}
	temp := &tempStruct{}
	err = json.Unmarshal([]byte(res), temp)
	if err != nil {
		logs.Error(err)
		return nil, err
	}

	return temp.Jobs, nil
}

func setAuthorization(req *httplib.BeegoHTTPRequest) {
	userid := beego.AppConfig.String("jenkins::userid")
	if userid == "" {
		logs.Error(`userid not set in [jenkins] section!`)
	}
	token := beego.AppConfig.String("jenkins::token")
	if userid == "" {
		logs.Error(`token not set in [jenkins] section!`)
	}
	req.SetBasicAuth(userid, token)
}

func getJenkinsHost() string {
	host := beego.AppConfig.String("jenkins::host")
	if host == "" {
		logs.Error(`host not set in [jenkins] section!`)
	}
	if !strings.HasSuffix(host, "/") {
		host = host + "/"
	}
	return host
}
