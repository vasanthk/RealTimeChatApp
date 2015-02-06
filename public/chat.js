(function ($) {

    var messages = [],
        socket = io.connect('http://localhost:3700'),
        field = $("#field"),
        sendButton = $("#send"),
        content = $("#content"),
        name = $("#name"),
        html;

    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data);
            html = '';
            for (var i = 0; i < messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.html(html);
        } else {
            console.log("There is a problem:", data);
        }
    });

    var sendMessage = function () {
        if (name.val() == "") {
            alert("Please type your name!");
        } else {
            var text = field.val();
            socket.emit('send', {message: text, username: name.val()});
            field.value = "";
        }
    };

    sendButton.on('click', sendMessage);

    $("#field").keyup(function (e) {
        if (e.keyCode == 13) {
            sendMessage();
        }
    });

})(jQuery);
