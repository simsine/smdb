# smdb - simsine Movie DataBase

## Intent

smdb is a website created to combine the best of services like IMDb, Letterboxd, MyAnimeList and more into a single application.
This is because i found these to lack certain features when it comes to tracking movies watched aswell as progress in watching series.

## Tech choices

As for information on the movies we want to track we fetch this from the [OMDb API](https://www.omdbapi.com/) which is a public API serving information based on IMDb.

The application uses the [SvelteKit](https://kit.svelte.dev/) fullstack web framework. This allows for responsive web pages that can interface directly with the backend via serverside actions.

On the backend we use the [Prisma ORM](https://www.prisma.io/) which is a JavaScript ORM that allows for easy database schema and CRUD operation. It also has a system for strong typing via auto-generated TypeScript interfaces.

[Postgres](https://www.postgresql.org/) is the database of choice for this application for what should be obvious reasons.

## Developing

Requirements for developing this application includes:

-   NodeJS
-   pnpm or the node package manager of your choice
-   Development Postgres instance via Docker or other means

You must first set the correct enviornment variables for the project, copy the example file with the following command

SECRET_APIKEY is an API key for the  OMDb API
DATABASE_URL is the connection url for the postgres database

```sh
cp .env.example .env && nano .env
```

Then you must install the dependencies using the following command

```sh
pnpm i
```

Then you must have an active Postgres instance, this can be done easiest with the provided docker compose file.

> Do note that this configuration does not persist the data, and it will be lost on shutdown.

```sh
docker compose -f ./docker/dev/docker-compose.yml up -d
```

It can be stopped again with

```sh
docker compose -f ./docker/dev/docker-compose.yml down
```

When you make changes to the schema you can generate new bindings by running
```sh
pnpx prisma generate
```

New database migrations can be made with the following command when changes have been made to the schema.

```sh
pnpx prisma migrate dev --name ""
```
