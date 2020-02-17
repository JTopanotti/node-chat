var express = require("express"),
    app = express()
    load = require("express-load"),
    error = require('./middleware/error'),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    bodyParser = require("body-parser")
    methodOverride = require("method-override");

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

app.listen(3000, () => {
    console.log("Node-chat online.");
});