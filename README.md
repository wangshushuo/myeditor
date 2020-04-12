## 概述

本项目用于写 hugo 博客。通过 github 授权的 token 请求 github api 进行文件的 crud 操作。

1. 读取 content/posts 目录下文件作为列表。通过列表打开文章。
1. 为编辑过程提供便利，比如增加快捷键和按钮（代码块、reference）、粘贴图片等。
1. 完成编辑后保存，改动直接提交到 github 仓库。仓库设有 github actions ，进行 hugo 的打包和部署（github pages）。

## 使用方法

- 使用公用的网站（github page）
- fork自己的项目（开通github page）
- 安装客户端（electron对公共网站包装）

无论以上哪种方式都使用一下方法
1. 准备一个 Personal access tokens （获取说明）
1. 首次使用时需要填写 access token 并给出获取方式（失效时也返回这个界面）（token存放在localstorage里）
1. 在你的仓库列表中选择 hugo 博客项目（选择后可切换）
1. 在文章列表中选择文章进行编辑（选择后可切换）
1. 可编辑配置信息（5种）
1. 编辑文章内容提供快捷键和按钮
1. 可切换颜色主题（配色方案）

> 定制化待抽象和探索

## github api
- [ ] 显示文章列表
- [x] 读取文件
- [x] 修改文件

## 编辑功能
- [x] 配置数据与博客正文分开编辑
- [ ] 粘贴图片
- [ ] --

## 快捷键
- [x] 代码块--F9
- [ ] 引用-- ctrl/cmd + /
- [ ] reference
