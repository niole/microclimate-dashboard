FROM node:10

WORKDIR /etc/ssl/certs

COPY ./keys .

WORKDIR /

COPY ./server ./server

COPY ./public ./public

COPY ./src ./src

COPY ./package-lock.json .

COPY ./package.json .

RUN npm i && npm run build && cd server && npm i

ENTRYPOINT node server/server.js
