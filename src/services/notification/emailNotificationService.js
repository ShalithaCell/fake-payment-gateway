const fs = require('fs');
const path = require('path');
const mailService = require('../system/mailer/nodeMailer.service');

const emailNotificationService = {
    sendReceiptEmail : async (appName, senderEmail, customerName, service, amount, total) =>
    {
        try
        {
            console.log('email send fired.');
            fs.readFile(path.resolve('public/receipt.html'), 'utf8', (err, data) =>
            {
                if (err)
                {
                    // TODO: send telegram notification
                    console.log(err);
                    throw err;
                }

                console.log(appName, customerName, amount, total);

                const htmlBody = data.replace("{app_name}", appName)
                    .replace("{customer_name}", customerName)
                    // .replace("{invoice_number}", new Date().getTime().toString())
                    .replace("{invoice_number}", 'sdsd')
                    // .replace("{date}", new Date().toISOString().slice(0, 10))
                    .replace("{date}", 'sdsd')
                    .replace('{amount}', amount)
                    .replace('{service}', service)
                    .replace("{total}", total);

                mailService.send(senderEmail, `${appName} E-Receipt`, htmlBody).then();
            });
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
};

module.exports = emailNotificationService;
