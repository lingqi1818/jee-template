#!/usr/bin/env bash

baseDir=`dirname $0`
baseDir=$baseDir/../

java -Djava.ext.dirs=../libs com.dumpcache.template.creator.ProjectCreator  $baseDir $* 
