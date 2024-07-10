<?php

namespace App\Controller;

use App\Repository\AccountCodeVerifyRepository;
use App\Repository\UserRepository;
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
    private $params;

    public function __construct(AccountCodeVerifyRepository $accountCodeVerifyRepository, UserRepository $userRepository, MailerService $mailerService, ParameterBagInterface $params)
    {
        $this->accountCodeVerifyRepository = $accountCodeVerifyRepository;
        $this->userRepository = $userRepository;
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
    public function accountVerify($id): JsonResponse
    {
        $user = $this->accountCodeVerifyRepository->findOneBy(['user' => $id]);
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

