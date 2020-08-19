# Apartment Microclimate Dashboard

Monitor the microclimates in your aparment in real time.

# How-To-Run

## start mongo (dev/prod)

1.
```sh
docker run -p 27017:27017 mongo:latest
```

2.
```sh
docker exec -it <container-id> mongo
```
3. put your floorplan in the data base
```sh
db.floorplans.insert({
  roomNames: ["apte-livingroom", "apte-bathroom", "apte-bedroom", "apte-kitchen"],
  floorPlanName: "apte"
})
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

1.
create openssl key and cert for DOMAIN. Store at SECRET_LOCATION. Must be named key.pem and cert.pem.

2. build the image
```sh
cd heatmap-dashboard && docker build -t heatmap-dashboard .
docker tag <image-id> <dockeruser>/heatmap-dashboard:<build-number>
docker push <dockeruser>/heatmap-dashboard:<build-number>
```

3. setup mongo as mentioned above

4. run the image

```sh
docker run \
-p 80:8000 \
<dockeruser>/heatmap-dashboard:<build-number> \
-e PORT=8000 \
-e KEY_PAIR_PASS="test"
```

# TODO docker containers are not talking to each other

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
