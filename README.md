English | [简体中文](./README.zh.md)

# Blog System

* A dynamic blog system independently developed by the author for personal use and open-sourced for learning and communication purposes.
* There are still many features to improve, and the author will continue refining the system over time.
* Currently, it is maintained and used by the author alone.

**My Website**: [https://web.lilkbox.tech/](https://web.lilkbox.tech/)
**Admin Dashboard**: [https://admin.lilkbox.tech/](https://admin.lilkbox.tech/)

---------------

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
Spring Boot | v2.7.18 | [spring.io](https://spring.io/projects/spring-boot)
MyBatis-Plus (**ORM**) | v3.5.5 | [mybatis.org](https://mybatis.org/mybatis-3/) / [baomidou.com](https://baomidou.com/en/)
Guava | v33.0.0-jre | [https://github.com/google/guava](https://github.com/google/guava)
Apache Maven | v3.5.2 | [https://maven.apache.org/](https://maven.apache.org/)
MySQL **(DB)** | v8.0.35 | [dev.mysql.com](https://dev.mysql.com/downloads/mysql/)
MongoDB **(DB)** | v8.0.5 | [https://www.mongodb.com/](https://www.mongodb.com/)
Nginx | v1.28.0 | [https://nginx.org/](https://nginx.org/)
Docker | - | [https://www.docker.com/](https://www.docker.com/)

---------------

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

### Other

- Complete **Admin System** api rate limit, Non-business APIs can only be done once within 2 seconds, and other APIs can only be done once whithin 50 milliseconds.

---------------

## Deployment

I use docker and docker-compose to deploy the manage this project.

I will show you about compose file and how to deploy this system.

### Prepare Deploy

We assume the deploy root dir is **`/usr/local/docker_app/blog`**, this is consistent with **`compose.yml`**

Deploy refrence: **`deploy`** Folder.

1. **Install docker server on your host server/cloud server**, the docker version will be close to new version, but maybe **Cloud Provider** already provide docker environment.
2. You need to download the **`compose.yml`** file from this repositoriy, and paste it to your server or any cloud server.
3. Create the corresponding directory structure according to **`compose.yml`** file, and **remenber to change these directory access**, **command: `sudo chmod -R 755 ${your path}/`**
4. After preparing **docker env** and **changed `compose.yml` file for your information**, you can packege **back-end.jar** from **Spring Boot project**, you can download it from this repositoriy, the back-end project directory is [this path](https://github.com/Lil-Kr/blog-system-single/tree/oh-router-change-base/system), you need to build it by **prod config file** for **this backend project**, this step need complete by yourself.
5. Prepar **`Dockerfile`** file, this project uses a mounted data **volume** approach to deploy the backend engineering. so you need create `docker image` on your server machine about the **backend** jar package, be careful your **`Dockerfile`** and **command: `sudo docker build -f ./Dockerfile -t blog-backend:v1.0 .`**, this **`Dockerfile`** is in **`/usr/local/docker_app/blog/back_end/`** directory. Other references to **`compose.yml`**
6. Upload **completed backend jar package(srping boot)** into your server and corresponding directory, like this: **`/usr/local/docker_app/blog/back_end/jar/`**
7. **Before starting docer container, double check whether the directory address of the host machine/server corresponds to the compose.yml file**.
8. Back to your **`compose.yml`** directory, and run command: **`sudo docker compose up -d`**, this will start all docker containers in the background.
9.  Check every container status by command: **`sudo docker ps -a`**.


> **Note**: If you want to stop all services, run command: **`sudo docker c down`**.

---------------

## Future Plans

### Blog Portal

- [x] Image Hotlink Protection
- [ ] Add a commenting system.
- [ ] Further optimize and polish the codebase.

### Admin Dashboard

- [x] Implement API rate limiting for Admin System.
- [ ] Implement API rate limiting for Front Portal.
- [ ] Add user registration and password recovery features.
- [ ] Add comment management module (to match the frontend comment functionality).
- [ ] Integrate email sending capabilities.
- [ ] Track IP access records.
- [ ] Add operation and permission logging.

_And more features whill be coming..._
