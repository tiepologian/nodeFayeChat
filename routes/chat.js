var chatController = require('../controllers/chat');

module.exports = function(app) {
    // define routes
    app.get('/test', function(req, res) {
        console.log("[%s %s] GET /test", req.ip, new Date().toISOString());
        chatController.test(req, res, app.get("model"));
    });

    app.get('/', function(req, res) {
        console.log("[%s %s] GET /", req.ip, new Date().toISOString());       
        res.render('index', {title: 'Home'});
    });

    app.post('/nodechat', function(req, res) {
        console.log("[%s %s] POST /nodechat", req.ip, new Date().toISOString());
        if(req.body.username == "") {
            res.render('index', {title: "ERROR", error: "Please choose valid username!"});
            return;
        }
        res.redirect('/nodechat?user='+req.body.username);
    });

    app.get('/nodechat', function(req, res) {
        console.log("[%s %s] GET /nodechat", req.ip, new Date().toISOString());
        if(req.param('user') === "" || req.param('user') === undefined) {
	    res.redirect('/');
            return;
        }
        res.render('chat', {user: req.param('user'), title: 'Chat'});
    });
}
