var heartbeatController = require('../controllers/heartbeat');

module.exports = function(app) {
    // define routes
    app.get('/users/:user', function(req, res) {
        console.log("[%s %s] HEARTBEAT %s", req.ip, new Date().toISOString(), req.params.user);
        heartbeatController.addUser(req, res, app.get("model"));
    });

    app.get('/users', function(req, res) {
        heartbeatController.listUsers(req, res, app.get("model"));
    });
}
