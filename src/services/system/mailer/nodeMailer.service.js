const nodemailer = require("nodemailer");
const { mailSenderIdentity, mailSenderPassword } = require("../../../config");

const mailService = {
    send : async (senderAddress, subject, message) =>
    {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host   : "smtp.gmail.com",
            port   : 587,
            secure : false, // true for 465, false for other ports
            auth   : {
                user : mailSenderIdentity, // generated ethereal user
                pass : mailSenderPassword, // generated ethereal password
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from : mailSenderIdentity, // sender address
            to   : senderAddress, // list of receivers
            subject, // Subject line
            html : message, // html body
        });

        console.log("Message sent: %s", info.messageId);
    },
};

module.exports = mailService;
