const fs = require('fs');
const path = require('path');

const PhonePayment = {
    payment : async (transactionData) =>
    {
        const transactionDataObj = JSON.stringify(transactionData);

        const data = fs.readFileSync(path.resolve('data/phone-transaction.json'));
        const json = JSON.parse(data);
        const transactionalJson = JSON.parse(transactionDataObj);

        json.push(transactionalJson);

        fs.writeFileSync(path.resolve('data/phone-transaction.json'), JSON.stringify(json));

        return {
            message : 'transaction is successful',
        };
    },
    history : async () =>
    {
        const data = fs.readFileSync(path.resolve('data/phone-transaction.json'));
        const json = JSON.parse(data);

        return json;
    },
};

module.exports = PhonePayment;
