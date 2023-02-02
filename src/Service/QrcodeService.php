<?php

namespace App\Service;
use Throwable;
use chillerlan\QRCode\QRCode;

class QrcodeService
{
    public function generate($ticket) {
        $domain = 'dong-hanh.org';
        $data = $domain.'?order='.$ticket;
        $qrcode = (new QRCode)->render($data);

        return $qrcode;
    }
}