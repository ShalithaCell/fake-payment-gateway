/**
 *             'app_name'            => 'ABC',
 *             'customer_email'      => 'john@gmail.com',
 *             'service'             => 'Electronic Items',
 *             'phone_number'        => '0771234567',
 *             'phone_holder_name'   => 'Example',
 *             'amount'              => '5000.00',
 *             'currency'            => 'USD',
 */

function Phone()
{
    this.app_name = '';
    this.service = '';
    this.customer_email = '';
    this.phone_number = '';
    this.phone_holder_name = '';
    this.amount = '';
    this.currency = '';
}

Phone.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = Phone;
