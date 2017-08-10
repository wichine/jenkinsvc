#!/bin/bash

docker run --name postgres -e POSTGRES_PASSWORD=123456 -p 5432:5432 -v $PWD/sql_init:/docker-entrypoint-initdb.d -v $PWD/postgresql/data:/var/lib/postgresql/data -d daocloud.io/postgres