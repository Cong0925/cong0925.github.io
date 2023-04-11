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
