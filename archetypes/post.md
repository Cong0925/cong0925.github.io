---
title: "{{ replace .Name "-" " " | title }}" # 博客文章的标题。
date: {{ .Date }} # 文章创建日期。
description: "文章描述。" # 用于搜索引擎的描述。
featured: true # 设置文章是否为特色文章，使其出现在主页侧边栏上。
draft: true # 设置是否呈现此页面。草稿为真将不会呈现。
toc: false # 控制是否为一级链接自动生成目录。
# menu: main
usePageBundles: false # 设置为true，以将像图像这样的资产分组在与此帖子相同的文件夹中。
featureImage: "/images/path/file.jpg" # 设置博客文章的特色图像。
featureImageAlt: '图像描述' # 特色图像的替代文本。
featureImageCap: '这是特色图像。' # 标题（可选）。
thumbnail: "/images/path/thumbnail.png" # 设置出现在主页卡片内的缩略图像。
shareImage: "/images/path/share.png" # 为社交媒体共享指定单独的图像。
codeMaxLines: 10 # 覆盖全局值，以在自动折叠之前显示代码块中的多少行。
codeLineNumbers: false # 覆盖全局值，以显示代码块内的行号。
figurePositionShow: true # 覆盖全局值，以显示图形标签。
categories:
  - 技术
tags:
  - 标签名1
  - 标签名2
# comment: false # 如果为false，则禁用评论。
---

**在此处插入引导段落。**
