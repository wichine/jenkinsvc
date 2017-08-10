package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/lib/pq"
)

var Oconnect orm.Ormer

func init() {
	dbName := beego.AppConfig.String("db::database")
	if dbName == "" {
		panic("database not set in app.conf -> [db]section!")
	}
	dbUser := beego.AppConfig.String("db::user")
	if dbUser == "" {
		panic("user not set in app.conf -> [db]section!")
	}
	dbPW := beego.AppConfig.String("db::passwd")
	dbHost := beego.AppConfig.String("db::host")
	if dbHost == "" {
		panic("host not set in app.conf -> [db]section!")
	}
	dbPort := beego.AppConfig.String("db::port")
	if dbPort == "" {
		panic("port not set in app.conf -> [db]section!")
	}

	dbType := beego.AppConfig.String("db::dbtype")
	if dbType == "postgres" {
		orm.RegisterDriver("postgres", orm.DRPostgres)
		connectStr := fmt.Sprintf(`user=%s password=%s dbname=%s host=%s port=%s sslmode=disable`, dbUser, dbPW, dbName, dbHost, dbPort)
		err := orm.RegisterDataBase("default", "postgres", connectStr)
		if err != nil {
			panic(err.Error())
		}
		err = orm.RegisterDataBase("jenkinsvc", "postgres", connectStr)
		if err != nil {
			panic(err.Error())
		}
	} else if dbType == "mysql" {
		orm.RegisterDriver("mysql", orm.DRMySQL)
		connectStr := fmt.Sprintf(`%s:%s@tcp(%s:%s)/%s?charset=utf8`, dbUser, dbPW, dbHost, dbPort, dbName)
		err := orm.RegisterDataBase("default", "mysql", connectStr)
		if err != nil {
			panic(err.Error())
		}
		err = orm.RegisterDataBase("jenkinsvc", "mysql", connectStr)
		if err != nil {
			panic(err.Error())
		}
	} else {
		panic("db type not supported for now!")
	}

}

func InitDB() {
	dbName := beego.AppConfig.String("db::database")
	Oconnect = orm.NewOrm()
	err := Oconnect.Using(dbName)
	if err != nil {
		panic(err.Error())
	}
}
