#!/bin/sh

######################################################################
#### Build component files in 'src' directory.  ######################
#### e.g.:                                      ######################
#### bash buildPackage.sh                       ######################
#### # user entry                               ######################
#### mainMenu.user.profile                      ######################
#### # directories and files created:           ######################
#### main-menu/user/profile                     ######################
#### 			profile.js														######################
#### 			profile.test.js                       ######################
#### 			profile.html                          ######################
#### 			profile.css                           ######################
######################################################################

function exit_script {
	echo -e "\n----------------------------------------"
	#print all arguments
	echo $@
	echo -e "----------------------------------------\n"
	exit 1
}
function array_join_by {
  local d=${1-} f=${2-}
  if shift 2; then
    printf %s "$f" "${@/#/$d}"
  fi
}
function str_to_kebab-kase {
	echo $1 | sed -r 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]'	
}
function spinal_to_upper {
    IFS=- read -ra str <<<"$1"
    printf '%s' "${str[@]^}"
}

echo "Type the path(camelCase) to the component separated by '.' and press [ENTER], ejem:
mainMenu.users.profile"
## get user package
read userPackage

## no user input, exit program
if [ -z "$userPackage" ]
then
  exit_script "You must enter a valid component name, e.g.: 'mainMenu.users.profile'."
fi

## goto "src" directory(create it if it does not exist)
appDirectory="src/"
if ! [ -d $appDirectory ]
then
	mkdir src
fi
cd $appDirectory

## remove interior spaces in userPackage
userPackage=${userPackage// /}
echo "userPackage -> "$userPackage

## package string split by "." into array 'folders'
IFS='.' read -r -a folders <<< "$userPackage"
## get last element(component name)
componentName="${folders[${#folders[@]}-1]}"
componentNameCamelCase=componentName
## component class name in PascalCase
componentName=${componentName^}
## file name in kebab-case
fileName=$(str_to_kebab-kase $componentName)
echo "componentName -> "$componentName
echo "fileName -> "$fileName

## save root path
foldersLength=${#folders[*]}
rootPath=""
for ((i=0; i<$foldersLength; i++)); do rootPath+="../"; done
echo "rootPath = "$rootPath

## all folders in kebab-case
count=0
for i in "${folders[@]}"
do
	folders[$count]=$(str_to_kebab-kase $i)
	count=$((count + 1))
done

## extracts from "userPackage" a series of values, class name, 
## directory and file names, css class names...
bemName=$(array_join_by '__' ${folders[*]})
# kebabCaseName=$(str_to_kebab-kase $userPackage)
# kebabCaseName=${kebabCaseName//[\.]/-}
pascalCaseName=$(spinal_to_upper $kebabCaseName)

packagePath=$(array_join_by '/' ${folders[*]})

echo "-------------------------------"
# echo "bemName -> "$bemName
# echo "kebabCaseName -> "$kebabCaseName
# echo "pascalCaseName -> "$pascalCaseName
echo "packagePath-> "$packagePath

## if the folder does not exist, the component is created
## if the folder exists but does not contain a component
##   the component is created
if [ -d $packagePath ]
then
	## folder exists
	if [ -f $packagePath/$fileName".js" ]
	then
		## the component has already been created
		exit_script "ERROR: The component '"$componentName"' already exists in the directory: "$packagePath
	fi
else
	## build folder
  mkdir -p $packagePath
fi

## goto folder
cd $packagePath

TAB='\t';
LINE_BREAK='\n';

## styles
file=$fileName".css"
touch $file
str=""
str=$str".$bemName{"$LINE_BREAK
str=$str$TAB"/* */"$LINE_BREAK
str=$str"}"$LINE_BREAK
echo -e $str >> $file

## template
file=$fileName".jsx"
touch $file
str=""
str=$str"import React from 'react';"$LINE_BREAK
str=$str"import './"$fileName".css';"$LINE_BREAK$LINE_BREAK
str=$str"export default function(){"$LINE_BREAK
str=$str$TAB"return <div className=\"$bemName\">"$componentName"</div>;"$LINE_BREAK
str=$str"}"$LINE_BREAK
echo -e $str >> $file

## component
file=$fileName".js"
touch $file
str=""
## str=$str"import {useState} from 'react';"$LINE_BREAK
str=$str"import React, {Component} from 'react';"$LINE_BREAK
str=$str"import template from './"$fileName".jsx';"$LINE_BREAK$LINE_BREAK
str=$str"class "$componentName" extends React.Component{"$LINE_BREAK
str=$str$TAB"constructor(){"$LINE_BREAK
str=$str$TAB$TAB"super();"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK
str=$str$TAB"handleClick(){"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK
str=$str$TAB"componentDidMount(){"$LINE_BREAK
str=$str$TAB$TAB"/* dom ready */"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK
str=$str$TAB"componentWillMount(){"$LINE_BREAK
str=$str$TAB$TAB"/* prepare data */"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK
str=$str$TAB"componentWillUnmount(){"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK
str=$str$TAB"render(){"$LINE_BREAK
str=$str$TAB$TAB"return template();"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK
str=$str"};"$LINE_BREAK$LINE_BREAK
str=$str"export default "$componentName";"$LINE_BREAK
echo -e $str >> $file

## test
file=$fileName".test.js"
touch $file
str=""
str=$str"import { render, screen } from '@testing-library/react';"$LINE_BREAK
str=$str"import $componentName from './$fileName.js';"$LINE_BREAK$LINE_BREAK
str=$str"test('renders $componentName', ()=>{"$LINE_BREAK
str=$str$TAB"render(<$componentName />);"$LINE_BREAK
str=$str$TAB"const linkElement = screen.getByText('$componentName');"$LINE_BREAK
str=$str$TAB"expect(linkElement).toBeInTheDocument();"$LINE_BREAK
str=$str"});"$LINE_BREAK
echo -e $str >> $file

exit_script "Component '"$componentName"' created."
