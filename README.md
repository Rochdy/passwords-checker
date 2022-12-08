## Short Intoduction
- This Repo includes:
  - [Task#1] An API to check the validity of a password
  - [Task#2 & Task#3] A script that:
    - Uses the api in Task#1 to check the validity of a set of password and change the valid status in DB
    - Uses `erasys/compromised-pw-api` to check and print if the password has been compromised

- This app contains 2 components (API & Script), it uses docker-compose file to setup the 4 needed services: [ `api` , `password_checker_script` , `mysql` , `erasys/compromised-pw-api` ]. Check `docker-compose.yml` & `src/components`
- The provided passwords dump is places in `docker/mysql/init` and it's mapped with 
`/docker-entrypoint-initdb.d` so it can be imported

- I tried to keep the app as minimal as possible, so i only used:
  - `express` for routing
  - `prisma` to deal with db
  - `tiny-json-http` to deal with http requests
  - `eslint` for linting
---


## Explain Project Structure & Important Folders

    ├── config           # configs of the app [password-rules, etc..]
    ├── docker           # docker files & scripts to use in docker-compose
    │   ├── api    # docker setup for the api component
    │   ├── sql    # docker setup for the sql
    │        ├── init  # starting scripts/dumps to load (including the provided sql passwords dump)
    │   └── script # docker setup for the script component
    ├── prisma           # models' schema and prisma configs
    ├── src              # main app folder
    │   ├── components  # app component api & script
    │   ├── routes      # routes (actions) for the api
    │   ├── scripts     # script to run (password-checker)
    │   ├── services    # service to help
    └── ...
---


## Setup with docker
This project is using docker & docker compose, so simply you can get everything up and running locally by running:
- `docker-compose up`: that will build all the 4 services [ `api` , `password_checker_script` , `mysql` , `erasys/compromised-pw-api` ]
- After that you can:
  - Check the API via `http://localhost:3000/`
  ![api](https://i.imgur.com/6r29yhG.png)
  - Run the script via `docker-compose exec password_checker_script npm run password:script` [the sql dump is already imported, so every thing should run fine 👀]
  ![script](https://i.imgur.com/33KeIu7.png)

