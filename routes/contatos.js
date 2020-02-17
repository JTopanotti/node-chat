module.exports = (app) => {
    var contatos = app.controllers.contatos,
        autenticar = require('../middleware/autenticador');

    app.get('/contatos', autenticar, contatos.index);
    app.get('/contatos/:id', autenticar, contatos.show);
    app.post('/contatos', autenticar, contatos.create);
    app.get('/contatos/editar', autenticar, contatos.edit);
    app.put('/contatos/:id', autenticar, contatos.update);
    app.del('/contatos/:id', autenticar, contatos.destroy);
};