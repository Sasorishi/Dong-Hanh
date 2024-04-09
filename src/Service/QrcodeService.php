<?php

namespace App\Service;
use Throwable;
use chillerlan\QRCode\QRCode;

class QrcodeService
{
    public function __construct(private $domain) {
        $this->domain = $domain;
    }

    public function generate(string $ticketId, string $participantId, string $eventId) {
        $data = $this->domain.'/api/ticket_check?ticket='.$ticketId.'&participant='.$participantId.'&event='.$eventId;
        $qrcode = (new QRCode)->render($data);

        return $qrcode;
    }

    public function generateMainLink() {
        $domain = $this->domain;
        $qrcode = (new QRCode)->render($domain);
        return $qrcode;
    }

    public function generateEvent(string $eventId) {
        $data = $this->domain.'/events/'.$eventId;
        $qrcode = (new QRCode)->render($data);

        return $qrcode;
    }
}