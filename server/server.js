const express = require('express')
const path = require('path');
const db = require('./infrastructure/database');
const Event = require('./domain/Event');

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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get('/events', (req, res) => {
  db
    .then(() => Event.find())
    .then(allEvents => res.send(allEvents))
    .catch(error => console.error('Failed to get all events', error));
});

app.post('/', (req, res) => {
  const { body } = req;

  db
    .then(() => new Event(body).save())
    .then(() => {
      if (mountedSocket) {
          mountedSocket.emit('change', body);
      } else {
          console.error("No users connected");
      }
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Failed to save new event', error);
      res.sendStatus(500);
    });
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
