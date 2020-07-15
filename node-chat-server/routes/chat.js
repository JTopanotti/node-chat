module.exports = (app) => {
    var chat = app.controllers.chat;
    app.get('/chat/:email', chat.index);
 }