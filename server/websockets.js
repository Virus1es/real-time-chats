const ws = require('ws');

const wss = new ws.Server({
    port: process.env.PORT || 5000,

}, () => console.log('Server started on port 5000'));

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

function broadcastMessage(msg) {
    wss.clients.forEach(client =>
        client.send(JSON.stringify(msg))
    );
}

const message = {
    event: 'message/connection',
    id: 123,
    date: '21.01.2021',
    username: 'test',
    message: 'Hello World!',
}