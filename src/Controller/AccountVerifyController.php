<?php

namespace App\Controller;

use App\Repository\AccountCodeVerifyRepository;
use App\Repository\UserRepository;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class AccountVerifyController extends AbstractController
{
    private $accountCodeVerifyRepository;

    private $mailerService;
    private $params;

    public function __construct(AccountCodeVerifyRepository $accountCodeVerifyRepository, MailerService $mailerService, ParameterBagInterface $params)
    {
        $this->accountCodeVerifyRepository = $accountCodeVerifyRepository;
        $this->mailerService = $mailerService;
        $this->params = $params;
    }

    #[Route('/account-verify/{id}', name: 'app_account_verify')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'AccountVerifyController',
        ]);
    }

    #[Route('/api/auth/account-verify/{id}', name: 'api_auth_account-verify', methods: ['POST'])]
    public function accountVerify(Request $request, $id): JsonResponse
    {
        $mail = $this->params->get("app.mail_address");
        $code = $this->codeGenerator();
        $newAccountCodeVerify = $this->accountCodeVerifyRepository->createAccountCodeVerify($code);
        $context = ([
            'user_id' => $newAccountCodeVerify->getUserId(),
            'user_email' => $newAccountCodeVerify->getEmail(),
            'code' => $code,
            'current_year' => new \DateTime('Y')
        ]);
        $this->mailerService->sendTemplateEmail($mail, $newAccountCodeVerify->getEmail(), "Verify your account", 'emails/verification_code.html.twig', $context);
        return new JsonResponse(['success' => true, 'message' => 'Signin successful']);
    }
}

