<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\MailerService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class SignupController extends AbstractController
{
    #[Route('/signup', name: 'app_signup')]
    public function index(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine): Response
    {
        if ($request->isMethod('POST')) {
            $response = $this->signin($request, $passwordHasher, $doctrine);

            if ($response !== null) {
                $responseContent = $response->getContent();
                $messages = json_decode($responseContent, true);

                if (isset($messages['SUCCESS']) && $messages['SUCCESS'] === false) {
                    return $this->render('index.html.twig', [
                        'controller_name' => 'SigninController',
                        'error' => $response->getContent(),
                    ]);
                }

                return $this->redirectToRoute('/response/signup');
            }
        }

        return $this->render('index.html.twig', [
            'controller_name' => 'SigninController',
        ]);
    }

    #[Route('/api/auth/signup')]
    public function signin($request, $passwordHasher, $doctrine): JsonResponse
    {
        $userRepository = $doctrine->getRepository(User::class);
        $email = $request->get("_username");
        $existingUser = $userRepository->findOneBy(['email' => $email]);

        if (!$existingUser) {
            $password = $request->get("_password");
            $confirmPassword = $request->get("_confirmPassword");

            if ($password === $confirmPassword) {
                $user = new User;
                $user->setEmail($email);
                $plaintextPassword = $password;
                
                $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
                $user->setPassword($hashedPassword);
                $user->setRoles(['user']);

                $entityManager = $doctrine->getManager();
                $entityManager->persist($user);
                $entityManager->flush();

                return new JsonResponse(['success' => true, 'message' => 'Signin successful']);
            } else {
                return new JsonResponse(['success' => false, 'message' => 'Password confirmation does not match.'], JsonResponse::HTTP_BAD_REQUEST);
            }
        } else {
            return new JsonResponse(['success' => false, 'message' => 'Email is already in use.'], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
