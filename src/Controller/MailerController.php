<?php

namespace App\Controller;

use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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

    #[Route('api/mailer/send/{type}', name: 'api_send_mail', methods: ['POST'])]
    public function sendEmail(Request $request, string $type): Response
    {
        $data = json_decode($request->getContent(), true);
        dump($data);

        switch ($type) {
            case 'contact':
                $response = $this->mailerService->sendRequestContact($data['email'], $data['firstName'], $data['lastName'], $data['subject'], $data['message']);
                return $response;
            
            default:
                return $this->json(['success' => false]);
        }
    }
}
