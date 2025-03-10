-- HOW TO USE: 
-- 1. Make sure the fullstack app is up and running (docker compose).
-- 2. Init database with the dump-user.sql file (`yarn run migrate:db-user`).
-- 3. Create the admin user directly using a PGSQL client (e.g. DBeaver).
-- 4. Init database with the dump.sql file (`yarn run migrate:db`).
-- In case of errors: 
--   1. stop the dockerized app: `docker compose -f compose.dev.yml -p tgc down`
--   2. reset Docker unused images, networks and volumes: `docker system prune --volumes -af`
--   3. remove DB named volume: `docker volume rm tgc_pgdata`
INSERT    INTO "user" ("email", "hashedPassword", "createdAt", "updatedAt")
VALUES    (
          'user@email.com',
          '$argon2id$v=19$m=19893.36898592844,t=2,p=1$1GbB4O6WVrTSU/l+UHWe2Q$ZqZkJRYWFWs9Kkj4bQuK72acQsSBehxReg6NA76l+wY',
          '2023-09-05 10:13:14.755',
          '2023-09-05 10:13:14.755'
          ),
          (
          'test@email.com',
          '$argon2id$v=19$m=19893.36898592844,t=2,p=1$mr3rz+5YM5gO++kvdSXbYw$ObeKlo73pB9Yn4wEwSs8iRrXuQ8G9XCFYGu/F9JQQ3Q',
          '2025-02-23 08:45:23.235',
          '2025-02-23 08:45:23.235'
          );