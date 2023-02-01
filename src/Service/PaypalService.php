<?php

namespace App\Service;
use Throwable;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;
use PayPalCheckoutSdk\Orders\OrdersGetRequest;
use PayPalCheckoutSdk\Payments\CapturesRefundRequest;

class PaypalService
{
    private $client_id;
    private $client_secret;
    private $price;

    public function __construct($client_id, $client_secret) {
        $this->client_id = $client_id;
        $this->client_secret = $client_secret;
        $this->price = '100.00';
    }

    public function setting() {
        $clientId = $this->client_id ;
        $clientSecret = $this->client_secret;

        $environment = new SandboxEnvironment($clientId, $clientSecret);
        $client = new PayPalHttpClient($environment);

        return $client;
    }

    public function getOrder($id) {
        // Here, OrdersCaptureRequest() creates a POST request to /v2/checkout/orders
        // $response->result->id gives the orderId of the order created above
        $request = new OrdersGetRequest($id);
        $client = $this->setting();
        try {
            // Call API with your client and get a response for your call
            $response = $client->execute($request);
            
            // If call returns body in response, you can get the deserialized version from the result attribute of the response
            // print_r($response);

            return json_encode($response);
        }catch (HttpException $ex) {
            echo $ex->statusCode;
            print_r($ex->getMessage());
        }
    }

    public function interface(): string {
        $client_id = $this->client_id;
        $price = $this->price;
        
        // alert(
        //     `Transaction \${transaction.status}: \${transaction.id}\n\nSee console for all available details`);
        // When ready to go live, remove the alert and show a success message within this page. For example:
        // const element = document.getElementById('paypal-button-container');
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');

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
                        const transactionId = orderData.id;
                        // actions.redirect('/success');
                        window.location.replace('/success?form=checkout&transaction_id=' + transactionId);
                    });
                }, 
                // handle unrecoverable errors
                onError: (err) => {
                    console.error('An error prevented the buyer from checking out with PayPal');
                    window.location.replace('/cancel?form=checkout&transaction_id=' + transactionId);
                }
            }).render('#paypal-button-container');
        </script>
        HTML;
    }

    public static function refundOrder($captureId, $debug=false)
    {
        $request = new CapturesRefundRequest($captureId);
        $request->body = self::buildRequestBody();
        $client = PayPalClient::client();
        $response = $client->execute($request);

        if ($debug)
        {
            print "Status Code: {$response->statusCode}\n";
            print "Status: {$response->result->status}\n";
            print "Order ID: {$response->result->id}\n";
            print "Links:\n";
            foreach($response->result->links as $link)
            {
                print "\t{$link->rel}: {$link->href}\tCall Type: {$link->method}\n";
            }
            // To toggle printing the whole response body comment/uncomment below line
            echo json_encode($response->result, JSON_PRETTY_PRINT), "\n";
        }
        return $response;
    }
}