module.exports = (app) => {
    var contatos = app.controllers.contatos;
    app.get('/contatos', contatos.index);
};