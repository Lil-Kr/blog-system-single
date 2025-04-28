[English](./README.md) | 简体中文

# 博客系统介绍

## 系统背景

* 这是一个动态博客系统, 由作者独立开发完成, 提供自己使用, 同时也开源出来, 供大家学习交流.
* 其中还有很多细节需要完善, 博主有空闲时间会继续完善它.
* 目前就博主一个人使用该系统与维护

--------------------

## 技术栈介绍

### 前端技术

技术栈 | 版本 | 官网链接
---------|----------|---------
 React.js | v18.2.0 | [https://reactjs.org/](https://reactjs.org/)
 TypeScript | v5.4.3 | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
 Node env | v18.20.0 | [https://nodejs.ogr/en/](https://nodejs.ogr/en/)
 npm | 10.5.0 | 
 router | v0.4.0 | [https://github.com/lblblong/oh-router](https://github.com/lblblong/oh-router)
 zustand | v4.5.2 | [https://docs.pmnd.rs/zustand/getting-started/introduction](https://docs.pmnd.rs/zustand/getting-started/introduction)
 tinymce | v5.10.9 | [https://www.tiny.cloud/](https://www.tiny.cloud/)
 Ant Design | v5.24.3 | [https://ant.design/](https://ant.design/)
 Nextui | v2.3.6 | [https://www.heroui.com/](https://www.heroui.com/)
 Tailwind CSS | v3.4.3 | [https://tailwindcss.com/](https://tailwindcss.com/)
 vite | v5.2.0 | [https://vitejs.dev/guide/](https://vitejs.dev/guide/)

--------------------

## 后端技术栈

技术栈 | 版本 | 官网链接
---------|----------|---------
SpringBoot | v2.7.18 | [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
Mybatis-Plus | v3.5.5 | [https://mybatis.org/mybatis-3/](https://mybatis.org/mybatis-3/) / [https://baomidou.com/](https://baomidou.com/)
MySQL | v8.0.x | [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
Nginx |  | [https://nginx.org/](https://nginx.org/)
Docker |  | [https://www.docker.com/](https://www.docker.com/)

--------------------

## 系统功能实现

### 博客门户站点

* 可以查询到最新发布的博客内容
* 支持切换主题, 切换语言等功能
* 支持响应式布局

### 后台管理系统

* 实现了完整的RBAC模型: 包括用户管理, 菜单管理, 角色管理, 权限管理等. 后期可将系统升级为多用户模式
* 实现了博客文章管理: 创建博客, 发布博客, 编辑博客, 删除博客等功能, 集成了TinyMCE 富文本编辑器
* 实现了如标签管理, 博客分类管理, 博客专题管理
* 实现了图片管理: 图片分类管理, 图片上传等功能

--------------------

## 未来需改善或将支持的功能

### 博客门户站点

* 支持评论功能
* 增加RSS订阅功能
* 优化代码细节...

### 后台管理系统

* 增加后端API限流功能
* 增加用户注册功能 与 密码找回功能
* 增加评论模块的管理, 与上面提到的保持一致
* 增加发送邮件功能
* 增加 ip 访问记录功能
* 增加权限操作日志功能
* 未完待续...