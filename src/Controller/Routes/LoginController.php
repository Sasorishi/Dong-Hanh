<?php

namespace App\Controller\Routes;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends AbstractController
{    
    #[Route('/login', name: 'app_login')]
    public function index(AuthenticationUtils $authenticationUtils, Security $security): Response
    {
        if ($security->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $security->getUser();

            if (!$user->isVerified()) {
                return $this->redirectToRoute('app_account_verify', ['id' => $user->getId()]);
            }

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
    public function forgetPassword(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    #[Route('/reset_password/{token}', name: 'app_reset_password')]
    public function resetPassword(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
        return $this->redirectToRoute('login');
    }
}
