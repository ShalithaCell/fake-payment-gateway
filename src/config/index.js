const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mailSenderIdentity : process.env.MAIL_SENDER_IDENTITY,
    mailSenderPassword : process.env.MAIL_SENDER_PASSWORD,
};
