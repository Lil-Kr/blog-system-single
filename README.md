# 博客系统项目信息

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [博客系统项目信息](#博客系统项目信息)
  - [项目开发版本说明](#项目开发版本说明)
    - [VM 虚拟机搭建](#vm-虚拟机搭建)
    - [前端架构](#前端架构)
    - [后端架构](#后端架构)
  - [后端服务端口规划](#后端服务端口规划)
    - [服务器软件安装端口规划](#服务器软件安装端口规划)
    - [JavaCode应用代码部署规划](#javacode应用代码部署规划)

<!-- /code_chunk_output -->

## 项目开发版本说明

### VM 虚拟机搭建

* **暂时规划5个虚拟机节点**
  * **存储相关的服务器1台**
  * **中间件1台**
  * **3台业务服务器**

### 前端架构

技术 | 版本 | 官网链接
---------|----------|---------
 reactjs | v18.x | https://reactjs.org/
 typescript | v4.x | xxx 
 router | v6.x | xxx
 redux | v8.x | xxx
 antd | v4.24.x | https://4x.ant.design/
 nodejs | v16.15.0 | https://nodejs.org/en/
 nvm | v1.1.9 | https://github.com/coreybutler/nvm-windows
 vite | v2.0 | https://vitejs.dev/guide/

### 后端架构

技术 | 版本 | 官网链接
---------|----------|---------
spring-boot | 2.6.11 | https://spring.io/projects/spring-boot#learn
spring-cloud-netflix | 2021.0.4 | https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E
spring-cloud-alibaba | 2021.0.4 | https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E
Spring Security | xxx | xxx
nacos-server | 2.0.4 | https://github.com/alibaba/nacos/releases/tag/2.0.4
mybatis-plus | xxx | xxx
MySQL | v8.x | xxx
Redis | xxx |xxxR
ElasticSearch | xxx | xxx

------------------------

## 后端服务端口规划

### 服务器软件安装端口规划

所需软件 | 服务器IP | 端口分配 | 说明
---------|----------|----------|---------
 Nacos | 192.168.88.100 | 8848 | -
 nginx | 192.168.88.110 | B3 | -
 MySQL | 192.168.88.120 | B3 | -
 Redis | 192.168.88.120 | 6379 | 安装目录: `/usr/local/redis`, refer-link: `https://www.cnblogs.com/jiangcong/p/15449452.html`
 Rocket MQ | 192.168.88.45 | 9876 | -
 Rocket MQ Dashboard  | 192.168.88.45 | 7070 | 安装: `https://blog.csdn.net/qq_43631716/article/details/119747200`
 ES | 192.168.88.140 | B3 | -

### JavaCode应用代码部署规划

服务名 | 服务器IP | 端口分配 | 说明 | 集群实例数量
---------|----------|----------|---------|---------
 Nacos | 192.168.88.100 | 8848 | 注册中心&配置中心 | 1
 gateway-server | 192.168.88.100 | 8010 | 网官 | 1
 nacos-client | 192.168.88.100 | 8020 | 服务注册发现, 配置中心 | 1
 blog-admin | 192.168.88.100 | 8030 | 对外提供后台管理的所有api | 1
 blog-web | 192.168.88.100 | 8040 | 对外提供web端的所有api | 1
 security-server | 192.168.88.100 | 8050 | 权限服务 | 1
 user-server | 192.168.88.100 | 8060 | 用户服务 | 1
 blog-server | 192.168.88.100 | 8070 | 博客服务 | 1
 picture-server | 192.168.88.100 | 8081 | 图片服务 | 1
 search-server | 192.168.88.100 | 8090 | 搜索服务 | 1
 monitor-server | 192.168.88.100 | 9010 | 监控服务 | 1
 sys-server | 192.168.88.100 | 9020 | 系统服务 | 1