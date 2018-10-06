const nodemailer = require('nodemailer');

var response = "Mail not sent";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shubh0896m@gmail.com',
        pass: '143@Gmail'
    }
});

var mailOptions = {
    from: 'firoj.ahmad121@webkul.com',
    to: 'shubhammehrotra.symfony@webkul.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

var sendMail = (() => {
    return this.response = transporter.sendMail(mailOptions);
});

exports.sendMail = sendMail;
exports.response = response;