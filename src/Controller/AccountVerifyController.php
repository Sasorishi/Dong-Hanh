<?php

namespace App\Controller;

use App\Repository\AccountCodeVerifyRepository;
use App\Repository\UserRepository;
use App\Service\AccountVerifyService;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('/api/auth/account-verify/{id}', methods: ['POST'])]
    public function accountVerify(Request $request, string $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $account = $this->accountCodeVerifyRepository->findOneBy(["user" => $id, "code" => $data['code']]);
        if (!$account) {
            return new JsonResponse(['success' => false, 'message' => 'Account not found']);
        }
    
        $currentDateTime = new \DateTime();
    
        if ($account->getExpiredAt() < $currentDateTime) {
            return new JsonResponse(['success' => false, 'message' => 'Expired code']);
        }
        
        $user = $this->userRepository->findOneBy(["id" => $id]);
        dump($user);
        $this->userRepository->setAccountVerify($user);
        return new JsonResponse(['success' => true, 'message' => 'Verify successful']);
    }

    #[Route('/api/auth/account-verify/resend/{id}', methods: ['POST'])]
    public function resentEmail($id): JsonResponse
    {
        $mail = $this->params->get("app.mail_address");
        $accountCode = $this->accountCodeVerifyRepository->findOneBy(['user' => $id]);
        $user = $this->userRepository->findOneBy(["id" => $id]);
        $newCode = $this->accountVerifyService->codeGenerator();
        $newCodeFormatted = $this->accountVerifyService->arrayToString($newCode);

        if (!$accountCode) {
            $this->accountCodeVerifyRepository->createAccountCodeVerify($newCodeFormatted, $user);
        } else {
            $this->accountCodeVerifyRepository->refreshAccountCodeVerify($newCodeFormatted, $id);
        }

        $context = ([
            'user_id' => $user->getId(),
            'user_email' => $user->getEmail(),
            'code' => $newCode,
            'current_year' => new \DateTime('Y')
        ]);
        $this->mailerService->sendTemplateEmail($mail, $user->getEmail(), "Verify your account", 'emails/verification_code.html.twig', $context);
        
        return new JsonResponse(['success' => true, 'message' => 'Verified account']);
    }
}

