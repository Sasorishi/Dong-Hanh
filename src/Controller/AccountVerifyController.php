<?php

namespace App\Controller;

use App\Repository\AccountCodeVerifyRepository;
use App\Repository\UserRepository;
use App\Service\AccountVerifyService;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountVerifyController extends AbstractController
{
    private $accountCodeVerifyRepository;
    private $userRepository;
    private $mailerService;
    private $accountVerifyService;
    private $params;

    public function __construct(AccountCodeVerifyRepository $accountCodeVerifyRepository, UserRepository $userRepository, MailerService $mailerService, ParameterBagInterface $params, AccountVerifyService $accountVerifyService)
    {
        $this->accountCodeVerifyRepository = $accountCodeVerifyRepository;
        $this->userRepository = $userRepository;
        $this->mailerService = $mailerService;
        $this->accountVerifyService = $accountVerifyService;
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
    public function accountVerify($id): JsonResponse
    {
        $user = $this->accountCodeVerifyRepository->findOneBy(['user' => $id]);
        return new JsonResponse(['success' => true, 'message' => 'Signin successful', 'userId' => $user->getUser()->getId(), 'code' => $user->getCode(), 'expiredAt' => $user->getExpiredAt()]);
    }

    #[Route('/api/auth/account-verify/resend/{id}', name: 'api_auth_account-verify', methods: ['POST'])]
    public function resentEmail($id): JsonResponse
    {
        $mail = $this->params->get("app.mail_address");
        $user = $this->accountCodeVerifyRepository->findOneBy(['user' => $id]);
        $newCode = $this->accountVerifyService->codeGenerator();
        $newCode = $this->accountVerifyService->arrayToString($newCode);
        $user->setCode($newCode);
        $dateTime = new \DateTime();
        $dateTime->modify("+10 minutes");
        $user->setExpiredAt($dateTime);
        $this->accountCodeVerifyRepository->save($user, true);
        $userData = $this->userRepository->findOneBy(["id" => $id]);
        $context = ([
            'user_id' => $userData->getId(),
            'user_email' => $userData->getEmail(),
            'code' => $userData,
            'current_year' => new \DateTime('Y')
        ]);
        $this->mailerService->sendTemplateEmail($mail, $userData->getEmail(), "Verify your account", 'emails/verification_code.html.twig', $context);
        return new JsonResponse(['success' => true, 'message' => 'Signin successful', 'userId' => $user->getUser()->getId(), 'code' => $user->getCode(), 'expiredAt' => $user->getExpiredAt()]);
    }

    #[Route('/api/auth/account-verify/database/{id}', name: 'api_auth_account-verify_database', methods: ['POST'])]
    public function accountVerifyDatabase($id): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => $id]);
        $user->setIsVerified(true);
        $this->userRepository->save($user, true);
        return new JsonResponse(['success' => true, 'message' => 'Signin successful']);
    }
}

