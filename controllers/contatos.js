module.exports = (app) => {
    var ContatoController = {
        index: (req, res) => {
            var usuario = req.session.usuario,
                params = {usuario: usuario};
            res.render('contatos/index', params);
        }
    }
    return ContatoController;
};