/**
 *             'app_name'            => 'ABC',
 *             'customer_email'      => 'john@gmail.com',
 *             'service'             => 'Electronic Items',
 *             'card_type'           => 'VISA',
 *             'card_holder_name'    => 'Example',
 *             'card_number'         => '4242424242424242',
 *             'expiryMonth'         => '01',
 *             'expiryYear'          => '2020',
 *             'cvv'                 => '123',
 *             'amount'              => '5000.00',
 *             'currency'            => 'USD',
 */

function Card()
{
    this.app_name = '';
    this.service = '';
    this.customer_email = '';
    this.card_type = '';
    this.card_holder_name = '';
    this.card_number = '';
    this.expiryMonth = '';
    this.expiryYear = '';
    this.cvv = '';
    this.amount = '';
    this.currency = '';
}

Card.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = Card;
