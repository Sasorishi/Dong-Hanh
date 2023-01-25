<?php

namespace App\Service;
use PHPMailer\PHPMailer\PHPMailer;
use Throwable;

class MailerService {
    private $mailer_username;
    private $mailer_password;
    private $mailer_provider;
    private $mailer_port;

    public function __construct($mailer_username, $mailer_password, $mailer_provider, $mailer_port) {
        $this->mailer_username = $mailer_username;
        $this->mailer_password = $mailer_password;
        $this->mailer_provider = $mailer_provider;
        $this->mailer_port = $mailer_port;
    }

    public function sendMail($request) {
        $mailer_username = $this->mailer_username;
        $mailer_password = $this->mailer_password;
        $mailer_provider = $this->mailer_provider;
        $mailer_port = $this->mailer_port;
        $sended = false;

        try {
            $mail = new PHPMailer;
            $mail->isSMTP();
            $mail->SMTPDebug = 2;
            $mail->Host = $mailer_provider;
            $mail->Port = $mailer_port;
            $mail->SMTPAuth = true;
            $mail->Username = $mailer_username;
            $mail->Password = $mailer_password;
            $mail->setFrom($mailer_username, 'Contact');
            $mail->addReplyTo($request->request->get('email'), $request->request->get('fullname'));
            $mail->addAddress($mailer_username, 'Contact');
            $mail->Subject = 'Contact Website - ' .$request->request->get('fullname'). ' - ' .$request->request->get('email');
            $mail->Body = $request->request->get('message');

            if (!$mail->send()) {
                echo 'Mailer Error: ' . $mail->ErrorInfo;
            } else {
                // echo 'The email message was sent.';
                $sended = true;
            }
        } catch (Throwable $th) {
            throw $th;
        }

        return $sended;
    }
}