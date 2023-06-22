# Movie API documentation

## Stack
  - Express
  - Typescript
  - Prisma
  - Nodemon
  - Sqlite3

## Installation

1) git clone https://github.com/pcazin/express-movie-api

2) npm install

3) npx prisma generate

Hint: In case imports from prisma clients are not available, re-install prisma packages and reload your text editor.

  - npm install @prisma/client
  - npm install prisma --save-dev

4) npx prisma migrate dev

5) Update .env variables with your port and API KEY.

6) npm run start