var express = require('express'),
    app = express(),
    port = 3700;

app.get("/", function (req, res) {
    res.send("All's good bro!");
});

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get("/", function (req, res) {
    res.render("page");
});
app.use(express.static(__dirname + '/public'));


var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port: " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', {message: 'Yo, wasup fellas'});
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
