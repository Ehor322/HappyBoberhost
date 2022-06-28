import http from 'http';
import socket from "socket.io";

export default (http: http.Server) => {
    const io = require('socket.io')(http);

    io.on('connection', (socket: any) => {
        socket.on('DIALOGS:JOIN', (dialogId: string) => {
            socket.dialogId = dialogId;
            socket.join(dialogId);
        });
        socket.on('DIALOGS:TYPING', (obj: any) => {
            socket.broadcast.emit('DIALOGS:TYPING', obj);
        });
    });

    return io;
}