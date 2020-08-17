const express = require('express')
const path = require('path');

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

app.use(
  express.static(path.resolve(__dirname, '../build'))
);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
})

app.post('/', (req, res) => {
    const { body } = req;
    console.log(body);
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
