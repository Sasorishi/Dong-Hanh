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
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class SignupController extends AbstractController
{
    private $passwordHasher;
    private $userRepository;
    private $mailerService;
    private $params;
    private $accountVerifyService;
    private $accountCodeVerifyRepository;

    public function __construct(UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository, MailerService $mailerService, ParameterBagInterface $params, AccountVerifyService $accountVerifyService, AccountCodeVerifyRepository $accountCodeVerifyRepository)
    {
        $this->passwordHasher = $passwordHasher;
        $this->userRepository = $userRepository;
        $this->mailerService = $mailerService;
        $this->params = $params;
        $this->accountVerifyService = $accountVerifyService;
        $this->accountCodeVerifyRepository = $accountCodeVerifyRepository;
    }

    #[Route('/signup', name: 'app_signup')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'SignupController',
        ]);
    }

    #[Route('/api/auth/signup', name: 'api_auth_signup', methods: ['POST'])]
    public function signup(Request $request): JsonResponse
    {
        $mail = $this->params->get("app.mail_address");
        $data = json_decode($request->getContent(), true);
        $existingUser = $this->userRepository->findOneBy(['email' => $data['email']]);

        if ($existingUser) {
            return new JsonResponse(['success' => false, 'message' => 'Fail to signup, retry again']);
        } else {
            if ($data['password'] !== $data['confirmPassword']) {
                return new JsonResponse(['success' => false, 'message' => 'Password confirmation does not match']);
            }
        }

        $newUser = $this->userRepository->createUser($data['email'], $data['password'], $this->passwordHasher, false);
        $code = $this->accountVerifyService->codeGenerator();
        $this->accountCodeVerifyRepository->createAccountCodeVerify($this->accountVerifyService->arrayToString($code), $newUser);
        $context = ([
            'user_id' => $newUser->getId(),
            'user_email' => $newUser->getEmail(),
            'code' => $code,
            'current_year' => new \DateTime('Y')
        ]);
        $this->mailerService->sendTemplateEmail($mail, $newUser->getEmail(), "Verify your account", 'emails/verification_code.html.twig', $context);
        return new JsonResponse(['success' => true, 'message' => 'Signin successful', 'idUser' => $newUser->getId()]);
    }
}
