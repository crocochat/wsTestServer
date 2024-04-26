const express = require('express');
const app = express();
const WebSocket = require('ws');
const http = require('http'); 
const mockData = require('./mockdata.json')

// app.use("/", function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// app.use("/", express.static(__dirname));

// const server = app.listen(8080, () => {
//     console.log('Server is running on port 8080');
// });
// const socket = new WebSocket.Server({ server: server, path: '/ws' });

app.use("/", express.static(__dirname)); // 정적 파일 제공

const server = http.createServer(app); // express 서버를 HTTP 서버로 래핑
const socket = new WebSocket.Server({ server, path: '/ws' });

// let num = 0;

// function increaseNumber() {
//     num += 2;
// }

// function decreaseNumber() {
//     num -= 1;
// }

// setInterval(increaseNumber, 3000); 
// setInterval(decreaseNumber, 5000); 
// // const socket = new WebSocket.Server({ server }); // path 옵션 제거


socket.on('connection', (ws, req) => {
    function sendData() {
        ws.send(JSON.stringify({ mockData }));
    }

    const intervalId = setInterval(sendData, 4000);

    ws.on('close', () => {
        clearInterval(intervalId);
    });
});

const port = 8080;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

