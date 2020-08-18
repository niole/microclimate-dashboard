const express = require('express')
const path = require('path');
const eventsRoutes = require('./routes/events');
const db = require('./infrastructure/database');
const Event = require('./domain/Event');
const FloorPlan = require('./domain/FloorPlan');

const app = express()
const port = 8000
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let mountedSocket;

io.on('connection', (socket) => {
    mountedSocket = socket;
});

app.use(express.json({
    strict: false
}));

app.use('/', express.static(path.resolve(__dirname, '../build')));

app.use('/events', eventsRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

app.post('/floorplan/:name', (req, res) => {
  const { name } = req.params;
  const { body } = req;

  db
    .then(() => FloorPlan.findOne({ floorPlanName: name }))
    .then(foundFloorPlan => {
      if (!foundFloorPlan) {
        return Promise.reject(`Floor plan ${name} doesn't exist`);
      } else if (!foundFloorPlan.roomNames.find(roomName => roomName === body.key)) {
        return Promise.reject('Event type not valid');
      }
      return foundFloorPlan;
    })
    .then(() => new Event({
        roomName: body.key,
        temperature: body.value,
        floorPlanName: name,
        createdAt: body.createdAt
      }).save()
    )
    .then(() => {
      if (mountedSocket) {
          mountedSocket.emit('change', body);
      } else {
          console.error("No users connected");
      }
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Failed to save new event. error: ', error);
      res.sendStatus(500);
    });
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
