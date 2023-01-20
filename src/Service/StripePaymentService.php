<?php

namespace App\Service;
use Throwable;

class StripePaymentService
{
    private $stripe_apikey_secret;
    private $stripe_apikey_public;
    private $domain;

    public function __construct($stripe_apikey_secret, $stripe_apikey_public) {
        $this->stripe_apike_secret = $stripe_apikey_secret;
        $this->stripe_apike_public = $stripe_apikey_public;
        $this->domain = 'http://127.0.0.1:8000';
    }

    public function checkout() {
        $apikey = $this->stripe_apike_secret;
        \Stripe\Stripe::setApiKey($apikey);
        header('Content-Type: application/json');
        $checkout_url = null;
        
        try {
            $checkout_session = \Stripe\Checkout\Session::create([
                'line_items' => [[
                  # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
                  'price' => 'price_1MSBXvLjRwcsxYA5FFtnVaVQ',
                  'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => $this->domain . '/success',
                'cancel_url' => $this->domain . '/cancel',
            ]);

            // header("HTTP/1.1 303 See Other");
            // header("Location: " . $checkout_session->url);
            $checkout_url = $checkout_session->url;
        } catch (Throwable $th) {
            throw $th;
        }
        
        return $checkout_url;
    }
}