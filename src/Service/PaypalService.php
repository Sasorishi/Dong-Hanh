<?php

namespace App\Service;
use Throwable;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Core\ProductionEnvironment;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;
use PayPalCheckoutSdk\Orders\OrdersGetRequest;
use PayPalCheckoutSdk\Payments\CapturesRefundRequest;
use Sample\PayPalClient;

class PaypalService
{
    private $client_id;
    private $client_secret;
    private $sandbox;

    public function __construct(private $dev_client_id, private $dev_client_secret, private $prod_client_id, private $prod_client_secret, $sandbox=false) {
        $this->sandbox = $sandbox;
        if ($sandbox) {
            $this->client_id = $dev_client_id;
            $this->client_secret = $dev_client_secret;
        } else {
            $this->client_id = $prod_client_id;
            $this->client_secret = $prod_client_secret;
        }
    }

    public function client() {
        $clientId = $this->client_id ;
        $clientSecret = $this->client_secret;

        if ($this->sandbox) {
            $environment = new SandboxEnvironment($clientId, $clientSecret);
        } else {
            $environment = new ProductionEnvironment($clientId, $clientSecret);
        }

        $client = new PayPalHttpClient($environment);

        return $client;
    }

    public function getOrder($id) {
        // Here, OrdersCaptureRequest() creates a POST request to /v2/checkout/orders
        // $response->result->id gives the orderId of the order created above
        $request = new OrdersGetRequest($id);
        $client = $this->client();
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

    public function interface($event): string {
        $client_id = $this->client_id;
        $label = $event->getLabel();
        $year = $event->getYear();
        $price = $event->getPrice();
        $currency = $event->getCurrency();
        
        // alert(
        //     `Transaction \${transaction.status}: \${transaction.id}\n\nSee console for all available details`);
        // When ready to go live, remove the alert and show a success message within this page. For example:
        // const element = document.getElementById('paypal-button-container');
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');

        return <<<HTML
        <script src="https://www.paypal.com/sdk/js?client-id={$client_id}&currency={$currency}"></script>
        <div id="paypal-button-container"></div>
        <script>
            paypal.Buttons({
                // Sets up the transaction when a payment button is clicked
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: '{$label} - Ticket {$year}',
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
                    });
                }, 
                // handle unrecoverable errors
                onError: (err) => {
                    console.error('An error prevented the buyer from checking out with PayPal');
                }
            }).render('#paypal-button-container');
        </script>
        HTML;
    }

    public function refundOrder($ticket, $debug=false)
    {
        $request = new CapturesRefundRequest($ticket->getCaptureId());
        $request->body = array(
            'amount' =>
                array(
                    'value' => $ticket->getPrice(),
                    'currency_code' => $ticket->getCurrency()
                )
        );
        $client =  $this->client();
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