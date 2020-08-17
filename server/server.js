const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express()
const port = 8000
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const EVENTS_FILE_PATH = path.resolve(__dirname, './data/events.json');

let mountedSocket;

io.on('connection', (socket) => {
    mountedSocket = socket;
});

app.use(express.json({
    strict: false
}));

app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/data', express.static(path.resolve(__dirname, './data')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get('/events', (req, res) => {
  fs.readFile(EVENTS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedEvents = data.split('\n').filter(d => !!d).map(d => JSON.parse(d));
      res.send(parsedEvents);
    }
  });
});

app.post('/', (req, res) => {
    const { body } = req;
    const formattedEvent = `${JSON.stringify(body)}\n`;
    fs.appendFile(EVENTS_FILE_PATH, formattedEvent, function (err) {
      if (err) {
        console.error('Failed to save event', body, err);
      } else {
        console.info(`Saved event : ${body}`);
      }
    });

    if (mountedSocket) {
        mountedSocket.emit('change', body);
    } else {
        console.error("No users connected");
    }
    res.send(200);
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
