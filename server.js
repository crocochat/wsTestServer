const express = require('express');
const app = express();
const WebSocket = require('ws');
const http = require('http'); 

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

let num = 0;

function increaseNumber() {
    num += 2;
}

function decreaseNumber() {
    num -= 1;
}

setInterval(increaseNumber, 3000); 
setInterval(decreaseNumber, 5000); 
// const socket = new WebSocket.Server({ server }); // path 옵션 제거


socket.on('connection', (ws, req) => {
    // 클라이언트에게 데이터 전송
    function sendData() {
        ws.send(JSON.stringify({ counter: num }));
    }

    // 1초마다 데이터 전송
    const intervalId = setInterval(sendData, 2000);

    // 클라이언트 연결이 종료되면 clearInterval 호출
    ws.on('close', () => {
        clearInterval(intervalId);
    });
});

const port = 8080;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// socket.on('connection', (ws, req) => {
//     // User sent a message
//     ws.on('message', (msg) => {
//         // 카운터 값을 JSON 형식으로 전송
//         ws.send(JSON.stringify({ counter: num })); 
//     });
// });
// const WebSocket = require('ws');
// const socket = new WebSocket.Server({ server: server, path: '/ws' });

// socket.on('connection', (ws, req) => {
//     // User sent a message
//     ws.on('message', (msg) => {
//         ws.send('counter:', num); 
//     });
// });
