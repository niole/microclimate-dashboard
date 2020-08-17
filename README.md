# Apartment Microclimate Dashboard

Monitor the microclimates in your aparment in real time.

# How-To-Run

Ensure that you have node 10 and npm 6 available.

```sh
npm i && npm run build && cd server && npm i && node server.js
```

Open localhost:8000

# Send Events To UI

## Event schema

```
{
 "key": <micro-climate-id-string>,
 "value": <temperature-integer>
}
```

## Event types

Used in key of event.

1. 'apte-livingroom'
2. 'apte-bathroom'
3. 'apte-bedroom'
4. 'apte-kitchen'

## Example

```sh
curl --data "{\"key\":\"apte-kitchen\",\"value\":85.5}" -H "Content-Type: application/json" <host>:8000
```
