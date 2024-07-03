<?php

namespace App\Controller;

use App\Repository\UserRepository;
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

    public function __construct(UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository, MailerService $mailerService, ParameterBagInterface $params)
    {
        $this->passwordHasher = $passwordHasher;
        $this->userRepository = $userRepository;
        $this->mailerService = $mailerService;
        $this->params = $params;
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
        
        $newUser = $this->userRepository->createUser($data['email'], $data['password'], $this->passwordHasher);
        $context = ([
            'user_id' => $newUser->getId(),
            'user_email' => $newUser->getEmail(),
            'current_year' => new \DateTime('Y')
        ]);
        $this->mailerService->sendTemplateEmail($mail, $newUser->getEmail(), "Welcome", 'emails/welcome.html.twig', $context);
        return new JsonResponse(['success' => true, 'message' => 'Signin successful']);
    }
}
