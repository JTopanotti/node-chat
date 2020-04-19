module.exports = (app) => {
   var ChatController = {
       index: (req, res) => {
           var params = {email: req.params.email};
           res.render('chat/index', params);
       }
   } 
   return ChatController;
}