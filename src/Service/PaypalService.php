<?php

namespace App\Service;
use Throwable;

class PaypalService
{
    private $client_id;
    private $price;

    public function __construct($client_id) {
        $this->client_id = $client_id;
        $this->price = '100.00';
    }

    public function interface(): string {
        $client_id = $this->client_id;
        $price = $this->price;

        return <<<HTML
        <script src="https://www.paypal.com/sdk/js?client-id={$client_id}&currency=EUR"></script>
        <div id="paypal-button-container"></div>
        <script>
            paypal.Buttons({
                // Sets up the transaction when a payment button is clicked
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: {$price} // Can also reference a variable or function
                            }
                        }]
                    });
                },
                // Finalize the transaction after payer approval
                onApprove: (data, actions) => {
                    return actions.order.capture().then(function (orderData) {
                        // Successful capture! For dev/demo purposes:
                        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                        const transaction = orderData.purchase_units[0].payments.captures[0];
                        alert(
                            `Transaction \${transaction.status}: \${transaction.id}\n\nSee console for all available details`);
                        // When ready to go live, remove the alert and show a success message within this page. For example:
                        // const element = document.getElementById('paypal-button-container');
                        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                        // Or go to another URL:  actions.redirect('thank_you.html');
                    });
                }
            }).render('#paypal-button-container');
        </script>
        HTML;
    }
}