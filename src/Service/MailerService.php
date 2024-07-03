<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Twig\Environment;
use Throwable;

class MailerService {
    private $mailer;

    public function __construct(MailerInterface $mailer) {
        $this->mailer = $mailer;
    }

    public function sendTransactionalEmail(string $from, string $to, string $subject, string $text, string $html): Response
    {
        try {
            $email = (new Email())
                ->from(new Address($from, "Dong-Hanh")) // Sender
                ->to($to) // Receiver
                ->replyTo($from)
                ->subject($subject)
                ->text($text)
                ->html($html);

            $this->mailer->send($email);

            return new Response('Email sent successfully!');
        } catch (Throwable $th) {
            return new Response('Failed to send email: ' . $th->getMessage(), 500);
        }
    }

    public function sendTemplateEmail(string $from, string $to, string $subject, string $templateName, array $context = []): Response
    {
        try {
            $email = (new TemplatedEmail())
                ->from(new Address($from, "Dong-Hanh")) // Sender
                ->to($to) // Receiver
                ->replyTo($from)
                ->subject($subject)
                ->htmlTemplate($templateName)
                ->context($context);

            $this->mailer->send($email);

            return new Response('Email sent successfully!', Response::HTTP_OK);
        } catch (Throwable $th) {
            return new Response('Failed to send email: ' . $th->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }
}