const IOSocket = require('./io.js');
const mailer = require('./mailer.js');
const EventEmitter = require('events');
const shared = require('./sharable.js');
const DBOperation = require('./database.js');

class Subscriber extends EventEmitter
{
    constructor() {
        super();
        this.eventResponse = "something went wrong";
    }

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
        const sendMail = mailer.sendMail;
        const mailerResponse = sendMail();
        if(mailerResponse && mailerResponse.then) {
            let promise = shared.withErrorHandler(mailerResponse);
            promise.then((msg) => {
                this.eventResponse = msg;
            });
        }
    };

    async dbOperation(queryObject) {
        const dbOperation = new DBOperation();
        await dbOperation.dbOperation(queryObject);
        this.eventResponse = dbOperation.response;
        console.log(dbOperation.response);
    }
    
    async homePage(queryObject, httpServer) {
        const io = new IOSocket(httpServer);
        await io.render().then((file_data) => {
            res.write(file_data);
            res.end();
        })
    }
}

subscriber = new Subscriber();
subscriber.on('', subscriber.homePage);
subscriber.on('summer', subscriber.summerCall);
subscriber.on('winter', subscriber.winterCall);
subscriber.on('sendmail', subscriber.sendMail);
subscriber.on('database', subscriber.dbOperation);

module.exports = subscriber;

watch_out = "https://www.youtube.com/watch?v=9ErAONqE6HE";
"https://www.youtube.com/watch?v=1e4ltxBZZCA";
