var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


module.exports = function (credentials) {


    var mailTransport = nodemailer.createTransport(sgTransport({
        auth: {
            api_user: credentials.sendGrid.auth.api_user,
            api_key: credentials.sendGrid.auth.api_key
        }
    }));

    var from = '"Meadowlark Travel" <mail@nebesa.me>';
    var errorRecipient = 'mail@nebesa.me';

    return {
        send: function (to, subj, body) {
            mailTransport.sendMail({
                from: from,
                to: to,
                subject: subj,
                html: body,
                generateTextFromHtml: true
            }, function (err) {
                if (err)
                    console.error('Unable to send email: ' + err);
            });
        },

        emailError: function (message, filename, exception) {
            var body = '<h1>Meadowlark Travel Site Error</h1>' +
                    'message:<br><pre>' + message + '</pre><br>';
            if (exception)
                body += 'exception:<br><pre>' + exception + '</pre><br>';
            if (filename)
                body += 'filename:<br><pre>' + filename + '</pre><br>';
            mailTransport.sendMail({
                from: from,
                to: errorRecipient,
                subject: 'Meadowlark Travel Site Error',
                html: body,
                generateTextFromHtml: true
            }, function (err) {
                if (err)
                    console.error('Unable to send email: ' + err);
            });
        },
    };
};