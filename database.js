const mysql = require('mysql');

class DBOperation
{
    constructor() {
        this.response = "something went wrong";
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "webkul"
        });
    }

    async dbOperation(queryObject) {
        var self = this;
        await this.performDbAction(queryObject.action).then(() => {
            this.response = "success"
        }).catch((err) => {
            this.response = err;
        })
    }

    performDbAction(action) {
        var self = this;
        return new Promise((res, rej) => {
            var self2 = self;
            self.connection.connect((err) => {
                if(err) rej();

                let sqlCommand = action + " database node_test";
                let msg = "Database " + action + "ed!";
                self2.connection.query(sqlCommand, (err, result) => {
                    if (err) rej(err);
                    res();
                });
            })
        });
    }
}

module.exports = DBOperation;