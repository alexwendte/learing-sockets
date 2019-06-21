"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
app.get('/', (function (req, res) {
    res.send('hey');
}));
server.listen(7777, function () {
    console.log('listening on 7777');
});
var messages = [];
io.on('connection', function (client) {
    io.emit('serverMessage', messages);
    client.on('clientMessage', function (message) {
        messages.push(message);
        io.emit('serverMessage', messages);
    });
    client.on('clientDelete', function (index) {
        messages.splice(index, 1);
        io.emit('serverMessage', messages);
    });
    client.on('clientDraw', function (data) {
        io.emit('serverDraw', data);
    });
    client.on('clientDrawDelete', function () {
        io.emit('serverDrawDelete');
    });
    client.on('mouseDown', function () { return io.emit('mouseDown'); });
    client.on('mouseUp', function () { return io.emit('mouseUp'); });
});
//# sourceMappingURL=index.js.map