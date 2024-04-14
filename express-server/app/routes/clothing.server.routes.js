const users = require('../controllers/users.server.controller');
const clothing = require('../controllers/clothing.server.controller');
//
module.exports = function (app) {
        app.route('/api/clothing')
            .get(clothing.list)
            .post(users.requiresLogin, clothing.create);
        //
        app.route('/api/clothing/:userId')
            .get(clothing.read)
            .put(users.requiresLogin, clothing.update)
            .delete(users.requiresLogin, clothing.delete);
        //
        app.param('clothingId', clothing.clothingById);
};
