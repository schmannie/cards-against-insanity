const log = require('./utils/logging');

const HTTP = require('http');
const { Server } = require('socket.io');

log.debug("Intializing HTTP + WS server...");
const server_start_time = Date.now();

const http_port = process.env.NODE_ENV === 'development' ? 8080 : 80;
// TODO: add production client origin
const accepted_origin = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : null;

// TODO: enable HTTPS
const httpServer = HTTP.createServer(handleHTTPRequest);

const io = new Server(httpServer, {
    cors: {
        origin: accepted_origin
    },
});

// wsRouter.mount('*', 'auth', req => {

//     let auth_log = log.child({ channel: 'auth' });

//     const remoteAddress = req.remoteAddress;

//     // TODO: check req.origin

//     const connection = req.accept();

//     auth_log.info(`Accepted auth connection from ${remoteAddress}`);
//     auth_log = auth_log.child({ remote_address: remoteAddress });

//     connection.on('close', () => {

//         const code = connection.closeReasonCode;
//         const reason = connection.closeDescription;

//         auth_log = auth_log.child({ close_code: code });

//         switch (code) {
//             case WSConnection.CLOSE_REASON_NORMAL:
//             case WSConnection.CLOSE_REASON_GOING_AWAY:
//                 auth_log.info(`Closed auth connection: ${code} ${reason}`);
//                 break;
//             default:
//                 auth_log.error(`Closed auth connection: ${code} ${reason}`);
//         }
//     });
// });

io.on('connection', socket => {

    log.info(`WS connection from ${socket.id}`);

    socket.on('disconnect', () => {
        log.info(`WS disconnection from ${socket.id}`);
    });
});

function handleHTTPRequest(req, res) {

    log.info(`HTTP request: ${req.method} ${req.url} from ${req.socket.remoteAddress}`);
    res.end("Hello, world!");
}

httpServer.listen(http_port, () => {
    log.info(`HTTP server listening on port '${http_port}' (took ${Date.now() - server_start_time}ms)`);
});
