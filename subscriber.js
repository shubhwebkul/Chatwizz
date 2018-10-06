const EventEmitter = require('events');
const mailer = require('./mailer.js');
const shared = require('./sharable.js');

var eventResponse = "something went wrong";

class Subscriber extends EventEmitter {
    //Create an event handler:
    summerCall() {
        console.log('Temp - 42c!');
        this.eventResponse = "summer";
    };
    
    winterCall() {
        console.log('Temp - 2c!');
        this.eventResponse = "winter";
    };
    
    async sendMail() {
        await mailer.sendMail();
        if(mailer.response.then) {
            var promise = shared.withErrorHandler(mailer.response);
            promise.then((data) => {
                eventResponse = mailer.response.response;
            });
        }
    };
}

subscriber = new Subscriber();
subscriber.on('summer', subscriber.summerCall);
subscriber.on('winter', subscriber.winterCall);
subscriber.on('sendmail', subscriber.sendMail);

module.exports = subscriber;
exports.eventResponse = eventResponse;

watch_out = "https://www.youtube.com/watch?v=9ErAONqE6HE";
"https://www.youtube.com/watch?v=1e4ltxBZZCA";
