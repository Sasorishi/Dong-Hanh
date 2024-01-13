<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class SignupController extends AbstractController
{
    private $passwordHasher;
    private $userRepository;

    public function __construct(UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository)
    {
        $this->passwordHasher = $passwordHasher;
        $this->userRepository = $userRepository;
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
        $data = json_decode($request->getContent(), true);
        $existingUser = $this->userRepository->findOneBy(['email' => $data['email']]);

        if ($existingUser) {
            return new JsonResponse(['success' => false, 'message' => 'Email is already in use']);
        } else {
            if ($data['password'] !== $data['confirmPassword']) {
                return new JsonResponse(['success' => false, 'message' => 'Password confirmation does not match']);
            }
        }
        
        $this->userRepository->createUser($data['email'], $data['password'], $this->passwordHasher);
        return new JsonResponse(['success' => true, 'message' => 'Signin successful']);
    }
}
