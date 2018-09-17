## Database Manager

Database Manager is a cross-platform desktop app that lets users browse the contents of PostgreSQL databases and run custom queries. It uses Node.js, Vue.js, Electron.js and PostgreSQL.

## Screenshots

<img src="docs/screenshot.png" width="800">

## Getting Started

* Create a PostgreSQL database to test with.
* Create `.env` file in the root of the project folder. The structure of the `.env` file looks like this:
    ```
    DB_HOST="localhost"
    DB_PORT="5432"
    DB_USER="scottmangiapane"
    DB_PASSWORD=""
    DB_NAME="postgres"
    ```
    Replace these values with the connection info for your database.
* Build the project once with `npm run build` or automatically with `npm run build:watch`.
* Launch the app with `npm run start` or with `npm run start:watch`.

## Contributing

I'm currently not accepting pull requests as the app is still in its early stages. However I will welcome collaboration once the first major version is released :)
