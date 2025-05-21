English | [简体中文](./README.zh.md)

# Blog System

A dynamic blog system independently developed by the author for personal use and open-sourced for learning and communication purposes.

There are still many features to improve, and the author will continue refining the system over time.  
Currently, it is maintained and used by the author alone.

## Technology Stack

### Frontend

**Tech Stack** | **Version** | **Official Website**
:---|:---|:---
React.js | v18.2.0 | [reactjs.org](https://react.dev/versions#react-18)
TypeScript | v5.4.3 | [typescriptlang.org](https://www.typescriptlang.org/)
Node.js | v18.20.0 | [nodejs.org](https://nodejs.org/en/)
npm | 10.5.0 | 
oh-router | v0.4.0 | [github.com/lblblong/oh-router](https://github.com/lblblong/oh-router)
zustand | v4.5.2 | [docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
TinyMCE | v5.10.9 | [tiny.cloud](https://www.tiny.cloud/)
Ant Design | v5.24.3 | [ant.design](https://ant.design/)
Hero UI(Next UI) | v2.3.6 | [heroui.com](https://www.heroui.com/)
Tailwind CSS | v3.4.3 | [tailwindcss.com](https://tailwindcss.com/)
Vite | v5.2.0 | [vitejs.dev](https://vitejs.dev/guide/)

### Backend

**Tech Stack** | **Version** | **Official Website**
:---|:---|:---
Spring Boot | v2.7.18 | [spring.io](https://spring.io/projects/spring-boot)kv
MyBatis-Plus | v3.5.5 | [mybatis.org](https://mybatis.org/mybatis-3/) / [baomidou.com](https://baomidou.com/en/)
Guava | 33.0.0-jre | [Guava](https://github.com/google/guava)
MySQL | v8.0.x | [dev.mysql.com](https://dev.mysql.com/downloads/mysql/)
Nginx | - | [nginx.org](https://nginx.org/)
Docker | - | [docker.com](https://www.docker.com/)

## Features

### Blog Portal

- Browse the latest published blogs.
- Support for theme switching and language switching.
- Fully responsive design for different devices.

### Admin Dashboard

- Complete RBAC (Role-Based Access Control) implementation, including user, menu, role, and permission management. Ready for future multi-user expansion.
- Blog management: create, publish, edit, and delete articles, integrated with TinyMCE rich text editor.
- Tag management, category management, and topic management.
- Image management: upload images and manage image categories.

## Future Plans

### Blog Portal

- [ ] Add a commenting system.
- [ ] Add RSS feed support.
- [ ] Further optimize and polish the codebase.

### Admin Dashboard

- [ ] Implement API rate limiting.
- [ ] Add user registration and password recovery features.
- [ ] Add comment management module (to match the frontend comment functionality).
- [ ] Integrate email sending capabilities.
- [ ] Track IP access records.
- [ ] Add operation and permission logging.

_And more features whill be coming..._
