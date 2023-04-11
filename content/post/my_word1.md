---
author: "陈钦宇233"
title: "fetch接口使用"
date: 2023-04-08T08:31:52+00:00
---
# 个人简介

作者：陈钦宇233

## 只显示 作者是 XXX 的文章
{{- range (.Paginate (where .Site.RegularPages "Params.author" "陈钦宇233")).Pages }}
        {{ partial "excerpt" . }}
      {{- end }}

## fetch 调用接口
- 获取数据
- fetch('http://example.com/movies')
  .then(response => response.json())
  .then(data => console.log(data));

- 添加数据
- fetch('http://example.com/movies', {
  method: 'POST',
  body: JSON.stringify({
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: '1972'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => response.json())
  .then(data => console.log(data));

- 更新数据
- fetch('http://example.com/movies/1', {
  method: 'PUT',
  body: JSON.stringify({
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: '1972'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => response.json())
  .then(data => console.log(data));

- 删除数据
- fetch('http://example.com/movies/1', {
  method: 'DELETE'
}).then(response => console.log(response));






## 在hugo里我如何添加child_process

要在Hugo中使用child_process，您需要使用Node.js。Node.js是一种服务器端JavaScript运行时，它允许您在服务器上运行JavaScript代码。您可以使用Node.js的child_process模块来运行系统命令。

要在Hugo中使用child_process，请按照以下步骤操作：

确保您已安装Node.js。您可以从此处下载Node.js：https://nodejs.org/en/download/
在Hugo项目的根目录中创建一个名为package.json的文件。
在package.json文件中添加以下内容：
{
  "dependencies": {
    "child_process": "^1.0.2"
  }
}
运行npm install命令以安装child_process模块。
在Hugo项目中的JavaScript文件中，您可以使用以下代码来运行系统命令：
const { exec } = require('child_process');
exec('your command here', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
请注意，您需要将“your command here”替换为您要运行的实际命令。



## 

Hugo使用Go语言编写，因此它使用Go的模块系统来管理依赖项。您可以使用Go的import语法来导入包，但是Hugo不支持这种写法。

要在Hugo中引入包，请按照以下步骤操作：

在Hugo项目的根目录中创建一个名为go.mod的文件。
在go.mod文件中添加以下内容：
module your-module-name

go 1.16

require (
  github.com/your-dependency v1.0.0
)
请注意，您需要将“your-module-name”替换为您的模块名称，并将“github.com/your-dependency”替换为您要使用的实际依赖项。

运行以下命令以下载依赖项：
go mod download
在Hugo项目中的Go文件中，您可以使用以下代码来导入包：
import (
  "github.com/your-dependency"
)
请注意，您需要将“github.com/your-dependency”替换为您要导入的实际依赖项。

## 
当您在Hugo项目中使用child_process时，您可以使用以下代码来运行系统命令：

package main

import (
  "fmt"
  "os/exec"
)

func main() {
  cmd := exec.Command("ls", "-l")
  stdout, err := cmd.Output()
  if err != nil {
    fmt.Println(err.Error())
    return
  }
  fmt.Print(string(stdout))
}
请注意，您需要将“ls -l”替换为您要运行的实际命令。


##
要在Hugo项目中使用child_process，您需要使用Node.js。Node.js是一种服务器端JavaScript运行时，它允许您在服务器上运行JavaScript代码。如果您想使用Go语言编写Hugo项目，则可以使用Go的os/exec包来运行系统命令。

要在Hugo项目中使用os/exec包，请按照以下步骤操作：

在Hugo项目中的Go文件中，导入os/exec包：
import (
  "os/exec"
)
在您的代码中，使用以下代码来运行系统命令：
cmd := exec.Command("your command here")
stdout, err := cmd.Output()
if err != nil {
  fmt.Println(err.Error())
  return
}
fmt.Print(string(stdout))
请注意，您需要将“your command here”替换为您要运行的实际命令。