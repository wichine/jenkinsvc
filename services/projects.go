package services

import (
	"fmt"
	// "github.com/astaxie/beego/logs"
	"jenkinsvc/models"
)

func GetAllProjects() ([]*models.Project, error) {
	var projects []*models.Project
	var err error
	qs := models.Oconnect.QueryTable("project")
	_, err = qs.All(&projects)
	return projects, err
}

func AddProject(project *models.Project) error {
	qs := models.Oconnect.QueryTable("project")
	if qs.Filter("title", project.Title).Exist() {
		return fmt.Errorf("project already exists!")
	}
	_, err := models.Oconnect.Insert(project)
	if err != nil && err.Error() != "no LastInsertId available" {
		return err
	}
	return nil
}
