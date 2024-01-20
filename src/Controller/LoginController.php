<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\MailerService;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class LoginController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function index(AuthenticationUtils $authenticationUtils, Security $security)
    {
        if ($security->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('app_main');
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $email = $authenticationUtils->getLastUsername();

        if ($error !== null) {
            $jsonResponse = new JsonResponse(['success' => false, 'message' => 'Authentication failed.'], 401);
            return $this->render('index.html.twig', [
                'controller_name' => 'LoginController',
                'error' => $jsonResponse->getContent(),
            ]);
        }

        return $this->render('index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    #[Route('/forget_password', name: 'app_forget_password')]
    public function forgetPassword()
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    #[Route('/api/auth/is-authenticated', name: 'api_is_authenticated')]
    public function isAuthenticated(Security $security): JsonResponse
    {
        $isAuthenticated = $security->isGranted('IS_AUTHENTICATED_FULLY');

        return new JsonResponse(['isAuthenticated' => $isAuthenticated]);
    }

    #[Route('/api/auth/forget_password', name: 'api_forgot_password', methods: ['POST'])]
    public function requestForgetPassword(Request $request, UserRepository $userRepository, TokenGeneratorInterface $tokenGenerator, MailerService $mailerService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['email' => $data['email']]);

        if ($user) {
            $token = $tokenGenerator->generateToken();
            $userRepository->generateNewRequestTokenPassword($user, $token);

            $variables['domain'] = $this->getParameter('app.domain');
            $variables['token'] = $token;

            $mailerService->sendEmail($data['email'], "Dong Hanh Network - Request to reset password", "emailing/1675203885219-CLaujD5NotgkxwCs/resetPassword.html", $variables);
            return new JsonResponse(['success' => true, 'message' => "Request reset password sended"]);
        }

        return new JsonResponse(['success' => false, 'message' => "Email don't exists"]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
        return $this->redirectToRoute('login');
    }
}
