var express = require("express"),
    app = express()
    load = require("express-load"),
    error = require('./middleware/error'),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    bodyParser = require("body-parser")
    methodOverride = require("method-override"),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('node-chat'));
app.use(session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.use(error.notFound);
app.use(error.serverError);    

io.sockets.on('connection', (client) => {
    console.log("User connected!");
    client.on('send-server', (data) => {
        var msg = "<b>"+data.nome+":</b> "+data.msg+"<br>";
        client.emit('send-client', msg);
        client.broadcast.emit('send-client', msg);
    });
});

server.listen(3000, () => {
    console.log("Node-chat online.");
});