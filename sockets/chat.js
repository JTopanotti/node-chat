module.exports = function(io) {
    var sockets = io.sockets;
    sockets.on('connection', (client) => {
        console.log("User connected!");
        var usuario = client.handshake.session.usuario;
        client.on('send-server', (msg) => {
            msg = "<b>"+usuario.nome+":</b> "+msg+"<br>";
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
        });
    });
}