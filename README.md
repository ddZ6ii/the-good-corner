# The Good Corner

Welcome to The Good Corner, your trusted partner for local goods and services!

## 🚧 The project

### ...

### 🚧 Docker containers

- client (frontend)
- server (backend)
- db (postgres database)
- nginx (api gateway)

## 🚧 Screenshots

## Get Started

First make sur the Docker engine (daemon) is running in the background by opening Docker Desktop.

Then, run the following command to start the project in development mode:

### Run the application

```sh
docker compose -f compose.dev.yml -p tgc up --build
```

Finally open a browser and visit the URL: http://localhost:8080

### Stop the application

To stop the containers, run:

```sh
docker compose -f compose.dev.yml -p tgc down
```

or simply press <kbd>Ctrl</kbd>+<kbd>C</kbd> for a graceful stop.

### Reset the database

1. First, manually delete the Docker named volume:

```sh
docker volume ls
docker volume rm pgdata
```

2. Then, populate the database with the content from a `dump.sql` file to get you started:

```sh
yarn run migrate
```

3. Finally re-start the dockerized application:

```sh
docker compose -f compose.dev.yml -p tgc up --build
```

## 🚧 Built with

![html5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)
![css3](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)
![styled-components](https://img.shields.io/badge/styledcomponents-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)
![javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![react](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![react-router-dom](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white)
![axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)
![graphql](https://img.shields.io/badge/GraphQL-E10098.svg?style=for-the-badge&logo=GraphQL&logoColor=white)
![apollo-graphql](https://img.shields.io/badge/Apollo%20GraphQL-311C87.svg?style=for-the-badge&logo=Apollo-GraphQL&logoColor=white)
![type-orm](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=TypeORM&logoColor=white)
![postgresql](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![node](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![eslint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Author

🙋‍♂️ **About me** - Hi I'm _Denis Dezest_, full stack web developer

- GitHub: [ddZ6ii](https://github.com/ddZ6ii)
- LinkedIn: [denis-dezest](https://linkedin.com/in/denis-dezest)
