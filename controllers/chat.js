module.exports = (app) => {
   var ChatController = {
       index: (req, res) => {
           var resultado = {email: req.params.email,
                            usuario: req.session.usuario};
            res.render('chat/index', resultado);
       }
   } 
   return ChatController;
}