<?php

namespace App\Controller\Api;

use App\Repository\ResetsPasswordsRepository;
use App\Repository\UserRepository;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class AuthController extends AbstractController
{    
    #[Route('/api/auth/is-authenticated', name: 'api_is_authenticated')]
    public function isAuthenticated(Security $security): JsonResponse
    {
        $isAuthenticated = $security->isGranted('IS_AUTHENTICATED_FULLY');

        return new JsonResponse(['isAuthenticated' => $isAuthenticated]);
    }

    #[Route('/api/auth/session', name: 'api_session')]
    public function getSession(Security $security): JsonResponse
    {
        $userData = $security->getUser();
        if ($userData) {
            $formattedUserData = [
                'id' => $userData->getId(),
                'email' => $userData->getEmail(),
                'roles' => $userData->getRoles(),
            ];
            return new JsonResponse(['session' => $formattedUserData]);
        }
        return new JsonResponse(['error'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/api/auth/forget_password', name: 'api_forgot_password', methods: ['POST'])]
    public function requestForgetPassword(Request $request, UserRepository $userRepository, TokenGeneratorInterface $tokenGenerator, MailerService $mailerService, ResetsPasswordsRepository $resetsPasswordsRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['message' => "Email don't exists", Response::HTTP_BAD_REQUEST]);
        }

        $resetPassword = $resetsPasswordsRepository->findOneBy(['User' => $user->getId()]);
        
        if ($resetPassword) {
            $resetsPasswordsRepository->changeExpiredTokenPassword($resetPassword);
        }
        
        $token = $tokenGenerator->generateToken();
        $resetsPasswordsRepository->generateNewRequestTokenPassword($user, $token);

        $context = ([
            'domain' => $this->getParameter('app.domain'),
            'token' => $token,
            'user_id' => $user->getId(),
            'current_year' => new \DateTime('Y')
        ]);
        $response = $mailerService->sendTemplateEmail($this->getParameter('app.mail_address'), $data['email'], "Reset password", 'emails/reset_password.html.twig', $context);
        
        if ($response->getStatusCode() !== Response::HTTP_OK) {
            return new JsonResponse(['message' => "Failed to send email", Response::HTTP_BAD_REQUEST]);
        }
        
        return new JsonResponse(['message' => "Request reset password sended", Response::HTTP_OK]);
    }

    #[Route('/api/auth/reset_password', name: 'api_reset_password', methods: ['POST'])]
    public function requestResetPassword(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher, ResetsPasswordsRepository $resetsPasswordsRepository): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            // $user = $userRepository->findOneBy(['tokenPassword' => $data['token']]);
            $resetPassword = $resetsPasswordsRepository->findOneBy(['token' => $data['token']]);

            if ($resetPassword) {
                $userRepository->resetPassword($resetPassword->getUser(), $data['password'], $passwordHasher);
                $resetsPasswordsRepository->changeExpiredTokenPassword($resetPassword);
                return new JsonResponse(['message' => 'New password is set'], Response::HTTP_OK);
            }

            return new JsonResponse(['message' => 'New password is not set, try again later'], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'An error occurred: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/auth/change_password', name: 'api_change_password', methods: ['POST'])]
    public function requestChangePassword(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher, Security $security): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $security->getUser();
        if ($user) {
            $userRepository->changePassword($user, $data['password'], $passwordHasher);
            return new JsonResponse(['success' => true]);
        }

        return new JsonResponse(['success' => false]);
    }
}
