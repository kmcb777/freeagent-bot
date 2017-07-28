# create-react-node-app

[![Build Status](https://travis-ci.com/derniercri/create-react-node-app.svg?token=qdTQf4UgF3yAGT8BzkKv&branch=master)](https://travis-ci.com/derniercri/create-react-node-app)

__Todo__

- Implement server side rendering: https://medium.com/front-end-hacking/server-side-rendering-with-react-and-express-382591bfc77c
- Setup continuous delivery

__What is included ?__

- Express
- React/redux
- Webpack
- CI script
- Docker database
- Hot reload with Foreman/Webpack
- Flow (optional)

## Getting started

You can use docker to easily start databases

```
docker-compose up -d
```

Once the databases are started, run the migration script

```
cp .env.example .env
npm install
npm run db:migrate
npm run dev

```
