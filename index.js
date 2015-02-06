var express = require('express'),
    app = express(),
    port = 3700;

app.get("/", function (req, res) {
    res.send("All's good bro!");
});

app.listen(port);
console.log("Listening on port: " + port);