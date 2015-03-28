'use strict';

var Gitter = require('node-gitter');

var token = '2cd25639778f3b05dad4e5d8c4a70abed5696fab';
var gitter = new Gitter(token);

var room_id = process.argv[2] || 'rosko/gitter-bot';

var calc = function (arithmetic) {
    var result = 'NaN';
    try {
        result = eval(arithmetic);
    } catch (e) {
    }
    return result || 'NaN';
};

gitter.rooms.join(room_id).then(function (room) {

    console.log('Connected to: ' + room_id);
    var events = room.listen();

    events.on('message', function (message) {

        var text = message.text;
        if (text.substr(0, 5) === 'calc ') {
            var arithmetic = text.substr(5).replace(/[^0-9\+\*\-\/\(\)]/g, '');
            var answer = arithmetic + '=' + calc(arithmetic);
            room.send(answer);
            console.log('New calculation: ' + answer);
        }

    });

}).catch(function (err) {
    console.log('Can\'t connect to the room: ' + room_id);
    console.log(err);
});
