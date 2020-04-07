---
title: MySQL
url: /MySQL.html
author: 王书硕
date: 2020-04-02T22:24:03+08:00
lastmod : 2020-04-02T22:24:03+08:00
toc: true
summary: 这是一个介绍
categories:
- api
- 后端
- mysql
---
## tensorflow
系统ubuntu 18.04，显卡Gtx950，驱动390。 
1. 安装`nvidia-docker`和`nvidia-container-runtime`    
```shell
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update
```
```shell
sudo apt-get install -y nvidia-docker2=2.0.3+docker18.09.1-1 nvidia-container-runtime=2.0.0+docker18.08.1-1
sudo pkill -SIGHUP dockerd
```
666
777