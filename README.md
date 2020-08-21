# Apartment Microclimate Dashboard

Monitor the microclimates in your aparment in real time.

# How-To-Run

## start mongo dev

```sh
docker build -t devmongo . -f mongo.dock.dev
docker run -p 27017:27017 devmongo:latest
```

## start web app in dev

Ensure that you have node 10 and npm 6 available.

```sh
npm i && npm run build && cd server && npm i && PORT=8000 node server.js
```

Open localhost:8000

# Send Events To UI in dev

## Event schema

```
{
 "key": <micro-climate-id-string>,
 "value": <temperature-integer>,
 "createdAt": <ms>
}
```

## How-To-Send in dev

```sh
curl \
--data "{\"createdAt\":1502349204,\"key\":\"apte-kitchen\",\"value\":85.5}" \
-H "Content-Type: application/json" \
localhost:8000/floorplan/apte
```

## start web app in prod

1. Create openssl key and cert for DOMAIN. Store in ./keys/. Must be named key.pem and cert.pem.

2. Ensure that init.js file seeds the right floorplan.

3. Run `docker-compose up -d`. If you have run this before, you might have to wipe existing docker state by running some combination of the following commands:

```sh
docker-compose stop
docker rm <webapp-cid> <db-cid>
docker-compose build
```

4. Look at `https://DOMAIN`

# Send Events To UI in prod

1. Spawn certs for each client that sends events to UI.

2. example request with cert.
```sh
curl \
--data "{\"createdAt\":1502349204,\"key\":\"apte-kitchen\",\"value\":85.5}" \
-H "Content-Type: application/json" \
--cacert <path-to-cert> \
https://DOMAIN/floorplan/apte
```
