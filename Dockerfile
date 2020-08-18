FROM node:10

WORKDIR /

COPY ./server ./server

COPY ./public ./public

COPY ./src ./src

COPY ./package-lock.json .

COPY ./package.json .

RUN npm i && npm run build

RUN cd server && npm i

CMD cd server && node server.js
