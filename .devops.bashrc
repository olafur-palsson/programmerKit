#!/bin/bash

alias mvntest="mvn test -Dtest=*"
# Test all files in src/test/ with Maven

## Git
alias githardreset='git fetch --all; git reset --hard origin/master'
# Force get the latest updates from master

pullurl() {
# Pull the url in $1
	git init
	git remote add origin "$1"
	git pull origin master
}


