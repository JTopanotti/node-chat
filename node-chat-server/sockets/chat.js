module.exports = function(io) {
    var crypto = require('crypto'),
        sockets = io.sockets;
    sockets.on('connection', (client) => {
        var usuario = client.request.session.usuario;
        client.on('send-server', (msg) => {
            msg = "<b>"+usuario.nome+":</b> "+msg+"<br>";
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
        });
        
    });
}