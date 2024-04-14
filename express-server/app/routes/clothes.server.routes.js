const users = require('../controllers/users.server.controller');
const clothes = require('../controllers/clothes.server.controller');
//
module.exports = function (app) {
        app.route('/api/clothes')
            .get(clothes.list)
            .post(users.requiresLogin, clothes.create);
        //
        app.route('/api/clothes/:userId')
            .get(clothes.read)
            .put(users.requiresLogin, clothes.update)
            .delete(users.requiresLogin, clothes.delete);
        //
        app.param('clothingId', clothes.clothingById);
};
