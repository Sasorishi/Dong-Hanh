<?php

namespace App\Service;
use PHPMailer\PHPMailer\PHPMailer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class MailerService {
    private $mailer_username;
    private $mailer_password;
    private $mailer_provider;
    private $mailer_port;
    private $dir_templates;

    public function __construct($mailer_username, $mailer_password, $mailer_provider, $mailer_port, $dir_templates) {
        $this->mailer_username = $mailer_username;
        $this->mailer_password = $mailer_password;
        $this->mailer_provider = $mailer_provider;
        $this->mailer_port = $mailer_port;
        $this->dir_templates = $dir_templates;
    }

    // public function sendSignin($email, $name) {
    //     $mailer_username = $this->mailer_username;
    //     $mailer_password = $this->mailer_password;
    //     $mailer_provider = $this->mailer_provider;
    //     $mailer_port = $this->mailer_port;
    //     $dir_templates = $this->dir_templates;
    //     $template = file_get_contents($dir_templates.'emailing/1675203885219-CLaujD5NotgkxwCs/signin.html');
    //     $sended = false;

    //     try {
    //         $mail = new PHPMailer;
    //         $mail->isSMTP();
    //         $mail->SMTPDebug = 0;
    //         $mail->Host = $mailer_provider;
    //         $mail->Port = $mailer_port;
    //         $mail->SMTPAuth = true;
    //         $mail->Username = $mailer_username;
    //         $mail->Password = $mailer_password;
    //         $mail->setFrom($mailer_username, 'Dong Hanh - Support');
    //         $mail->addReplyTo($email, $name);
    //         $mail->addAddress($email, $name);
    //         $mail->isHTML(true);
    //         $mail->Subject = 'Confirmation signin - ' .$name. ' - ' .$email;
    //         $mail->Body = $template;
    //         $mail->send();

    //         // if (!$mail->send()) {
    //         //     echo 'Mailer Error: ' . $mail->ErrorInfo;
    //         // } else {
    //             // echo 'The email message was sent.';
    //             $sended = true;
    //         // }
    //     } catch (Throwable $th) {
    //         throw $th;
    //     }

    //     return $sended;
    // }

    // public function sendCheckout($email, $participant, $qrcode) {
    //     $mailer_username = $this->mailer_username;
    //     $mailer_password = $this->mailer_password;
    //     $mailer_provider = $this->mailer_provider;
    //     $mailer_port = $this->mailer_port;
    //     $dir_templates = $this->dir_templates;
    //     $template = file_get_contents($dir_templates.'emailing/1675203885219-CLaujD5NotgkxwCs/checkout.html');
    //     $sended = false;

    //     $variables['firstname'] = $participant->getFirstname();
    //     $variables['lastname'] = $participant->getLastname();
    //     $variables['participantId'] = $participant->getId();
    //     $variables['qrcode'] = $qrcode;
    //     foreach($variables as $key => $value)
    //     {
    //         $template = str_replace('{{ '.$key.' }}', $value, $template);
    //     }

        // try {
        //     $mail = new PHPMailer;
        //     $mail->isSMTP();
        //     $mail->SMTPDebug = 0;
        //     $mail->Host = $mailer_provider;
        //     $mail->Port = $mailer_port;
        //     $mail->SMTPAuth = true;
        //     $mail->Username = $mailer_username;
        //     $mail->Password = $mailer_password;
        //     $mail->setFrom($mailer_username, 'Dong Hanh - Support');
        //     $mail->addReplyTo($email, $participant->getFirstname());
        //     $mail->addAddress($email, $participant->getFirstname());
        //     $mail->isHTML(true);
        //     $mail->Subject = 'Confirmation payment';
        //     // $mail->Body = $dir_templates.'emailing/1675192987562-WOJnCvduOKxNHOLB/index.html';
        //     $mail->Body = $template;
        //     $mail->send();
        //     // if (!$mail->send()) {
        //     //     // echo 'Mailer Error: ' . $mail->ErrorInfo;
        //     // } else {
        //     //     echo 'The email message was sent.';
        //         $sended = true;
        //     // }
        // } catch (Throwable $th) {
        //     throw $th;
        // }

    //     return $sended;
    // }

    // public function sendRefund($email, $participant) {
    //     $mailer_username = $this->mailer_username;
    //     $mailer_password = $this->mailer_password;
    //     $mailer_provider = $this->mailer_provider;
    //     $mailer_port = $this->mailer_port;
    //     $dir_templates = $this->dir_templates;
    //     $template = file_get_contents($dir_templates.'emailing/1675203885219-CLaujD5NotgkxwCs/refund.html');
    //     $sended = false;

    //     $variables['firstname'] = $participant->getFirstname();
    //     $variables['lastname'] = $participant->getLastname();
    //     $variables['participantId'] = $participant->getId();
    //     foreach($variables as $key => $value)
    //     {
    //         $template = str_replace('{{ '.$key.' }}', $value, $template);
    //     }

    //     try {
    //         $mail = new PHPMailer;
    //         $mail->isSMTP();
    //         $mail->SMTPDebug = 0;
    //         $mail->Host = $mailer_provider;
    //         $mail->Port = $mailer_port;
    //         $mail->SMTPAuth = true;
    //         $mail->Username = $mailer_username;
    //         $mail->Password = $mailer_password;
    //         $mail->setFrom($mailer_username, 'Dong Hanh - Support');
    //         $mail->addReplyTo($email, $participant->getFirstname());
    //         $mail->addAddress($email, $participant->getFirstname());
    //         $mail->isHTML(true);
    //         $mail->Subject = 'Confirmation refund';
    //         // $mail->Body = $dir_templates.'emailing/1675192987562-WOJnCvduOKxNHOLB/index.html';
    //         $mail->Body = $template;
    //         $mail->send();
    //         // if (!$mail->send()) {
    //         //     // echo 'Mailer Error: ' . $mail->ErrorInfo;
    //         // } else {
    //         //     echo 'The email message was sent.';
    //             $sended = true;
    //         // }
    //     } catch (Throwable $th) {
    //         throw $th;
    //     }

    //     return $sended;
    // }

    // public function sendPassword($email, $token) {
    //     $mailer_username = $this->mailer_username;
    //     $mailer_password = $this->mailer_password;
    //     $mailer_provider = $this->mailer_provider;
    //     $mailer_port = $this->mailer_port;
    //     $dir_templates = $this->dir_templates;
        // $template = file_get_contents($dir_templates.'emailing/1675203885219-CLaujD5NotgkxwCs/resetPassword.html');
        // $sended = false;

        // $variables['domain'] = 'https://dong-hanh.org';
        // $variables['token'] = $token;
        // foreach($variables as $key => $value)
        // {
        //     $template = str_replace('{{ '.$key.' }}', $value, $template);
        // }

    //     try {
    //         $mail = new PHPMailer;
    //         $mail->isSMTP();
    //         $mail->SMTPDebug = 0;
    //         $mail->Host = $mailer_provider;
    //         $mail->Port = $mailer_port;
    //         $mail->SMTPAuth = true;
    //         $mail->Username = $mailer_username;
    //         $mail->Password = $mailer_password;
    //         $mail->setFrom($mailer_username, 'Dong Hanh - Support');
    //         $mail->addReplyTo($email, $email);
    //         $mail->addAddress($email, $email);
    //         $mail->isHTML(true);
    //         $mail->Subject = 'Reset password';
    //         // $mail->Body = $dir_templates.'emailing/1675192987562-WOJnCvduOKxNHOLB/index.html';
    //         $mail->Body = $template;
    //         $mail->send();
    //         // if (!$mail->send()) {
    //         //     // echo 'Mailer Error: ' . $mail->ErrorInfo;
    //         // } else {
    //         //     echo 'The email message was sent.';
    //             $sended = true;
    //         // }
    //     } catch (Throwable $th) {
    //         throw $th;
    //     }

    //     return $sended;
    // }

    private function configureMailer(PHPMailer $mail)
    {
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->Host = $this->mailer_provider;
        $mail->Port = $this->mailer_port;
        $mail->SMTPAuth = true;
        $mail->Username = $this->mailer_username;
        $mail->Password = $this->mailer_password;
    }

    /**
     * @param string $from
     * @param string $firstname
     * @param string $lastname
     * @param string $subject
     * @param string $message
     * @return JsonResponse
     */
    public function sendRequestContact(string $from, string $firstname, string $lastname, string $subject, string $message): JsonResponse {
        $sended = false;

        try {
            $mail = new PHPMailer;
            $this->configureMailer($mail);

            $mail->setFrom($this->mailer_username, $firstname. " " .$lastname);
            $mail->addReplyTo($from, $firstname. " " .$lastname);
            $mail->addAddress($this->mailer_username, "Contact form");
            $mail->Subject = $subject;
            $mail->Body = $from. ", " .$firstname. " " .$lastname. " write :" .$message;
            $mail->send();

            // if (!$mail->send()) {
            //     echo 'Mailer Error: ' . $mail->ErrorInfo;
            // } else {
                // echo 'The email message was sent.';
                $sended = true;
            // }
        } catch (Throwable $th) {
            throw $th;
        }

        return new JsonResponse(['success' => $sended]);
    }

    public function sendEmail(string $to, string $subject, string $message = null, string $templateName = null, array $variables = null, string $fromName = null, string $replyToEmail = null, string $replyToName = null): JsonResponse
    {
        $sended = false;

        try {
            $mail = new PHPMailer;
            $this->configureMailer($mail);

            $mail->setFrom($this->mailer_username, $fromName ?? 'Dong Hanh - Support');
            $mail->addReplyTo($replyToEmail ?? $this->mailer_username, $replyToName ?? 'Support');
            $mail->addAddress($to);
            $mail->isHTML(true);
            $mail->Subject = $subject;


            if ($variables != null && $templateName != null) {
                $template = file_get_contents($this->dir_templates.$templateName);

                foreach ($variables as $key => $value) {
                    $template = str_replace('{{ ' . $key . ' }}', $value, $template);
                }
            }

            if ($templateName != null && $message = null) {
                $mail->Body = $templateName;
            } else {
                $mail->Body = $message;
            }

            $mail->send();
            dump($mail);
            $sended = true;
        } catch (Throwable $th) {
            throw $th;
        }

        return new JsonResponse(['success' => $sended]);
    }

}