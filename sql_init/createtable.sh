#!/bin/bash
psql -U postgres -c "CREATE DATABASE jenkinsvc"
psql -U postgres jenkinsvc < /docker-entrypoint-initdb.d/jenkinsvc.sql 