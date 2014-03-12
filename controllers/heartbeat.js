var controller = module.exports;

controller.listUsers = function(req, res, model) {
    model.listUsers(function(success, result) {
	if(success) res.json(result);
        else res.end("ERROR");
    });
}

controller.addUser = function(req, res, model) {
    model.addUser(req.params.user, function(success) {
        if(success) res.end("OK");
        else res.end("ERROR");
    })
}
