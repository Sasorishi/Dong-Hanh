<?php

namespace App\Service;
use Throwable;

class RecaptchaService
{
    private $key;
    private $secret;

    public function __construct(private $recaptcha_key, private $recaptcha_secret, $sandbox = false)
    {
        if ($sandbox) {
            $this->key = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
            $this->secret = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
        } else {
            $this->key = $recaptcha_key;
            $this->secret = $recaptcha_secret;
        }
    }

    public function requestApi($token) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify?secret='.$this->secret.'&response='.$token,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array(
            'content-type: application/json',
            'content-length: 0'
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return json_decode($response, true);
    }

    public function getKey() {
        return $this->key;
    }
}