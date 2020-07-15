const KEY = 'nodechat.sid', SECRET = 'nodechat';
var express = require("express"),
    app = express()
    load = require("express-load"),
    error = require('./middleware/error'),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    bodyParser = require("body-parser")
    methodOverride = require("method-override"),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    mongoose = require("mongoose"),
    
    cookie = cookieParser(SECRET),
    store = new session.MemoryStore(),
    sessOpts = {secret: SECRET, key: KEY, store: store},
    session =  session(sessOpts);

global.db = mongoose.connect("mongodb://localhost/nodechat");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);
load('sockets')
    .into(io);

app.use(error.notFound);
app.use(error.serverError);    

io.set('authorization', function(data, accept) {
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                accept(null, false);
            } else {
                data.session = session;
                accept(null, true)
            }
        });
    });
});

server.listen(3000, () => {
    console.log("Node-chat online.");
});