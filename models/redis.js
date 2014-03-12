var model = module.exports,
    redis = require('redis');

model.setup = function() {
    console.log("[127.0.0.1 %s] Setting up redis...", new Date().toISOString());
}

model.name = "Redis Server Model";

model.addUser = function(username, done) {
    client = redis.createClient();
    client.setex(username, 5, "ONLINE", function(err) {
	client.quit();
        if(!err) done(true);
        else done(false);
    });
}

model.listUsers = function(done) {
    client = redis.createClient();
    client.keys("*", function(err, replies) {
	client.quit();
	done(!err, replies);
    });
}
