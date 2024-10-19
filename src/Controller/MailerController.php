<?php

namespace App\Controller;

use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MailerController extends AbstractController
{
    private $mailerService;

    public function __construct(MailerService $mailerService)
    {
        $this->mailerService = $mailerService;
    }

    #[Route('api/mailer/send', name: 'api_send_mail', methods: ['POST'])]
    public function sendEmail(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $context = ([
            'user_firstname' => $data['firstName'],
            'user_lastname' => $data['lastName'],
            'user_email' => $data['email'],
            'user_phone' => $data['phone'],
            'subject' => $data['subject'],
            'message' => $data['message'],
            'current_year' => new \DateTime('Y')
        ]);

        $response = $this->mailerService->sendContactForm($data['email'], $this->getParameter('app.mail_address'), "Someone try to reach us", $context);

        if ($response->getStatusCode() !== Response::HTTP_OK) {
            return new JsonResponse(['message' => "Failed to send email", Response::HTTP_BAD_REQUEST]);
        }

        return new JsonResponse(['message' => "Email sent successfully", Response::HTTP_OK]);
    }
}
