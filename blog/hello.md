---
title: docker
author: azu
type: post
date: 2019-06-06T01:47:46+00:00
url: /docker.html
description: 前端789
categories:
- Development
- VIM
category:
- 前端123

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