<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AccountController extends AbstractController
{
    #[Route('/account', name: 'app_account')]
    public function index(AuthenticationUtils $authenticationUtils, Security $security)
    {
        if (!$security->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('app_main');
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $email = $authenticationUtils->getLastUsername();

        if ($error !== null) {
            new JsonResponse(['success' => false, 'message' => 'Authentication failed'], 401);
            return $this->render('index.html.twig', [
                'controller_name' => 'LoginController',
                'error' => 'Authentication failed',
            ]);
        }

        return $this->render('index.html.twig', [
            'controller_name' => 'AccountController',
        ]);
    }

    #[Route('/account/tickets', name: 'app_account_tickets')]
    public function tickets(AuthenticationUtils $authenticationUtils, Security $security)
    {
        if (!$security->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('app_main');
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $email = $authenticationUtils->getLastUsername();

        if ($error !== null) {
            new JsonResponse(['success' => false, 'message' => 'Authentication failed'], 401);
            return $this->render('index.html.twig', [
                'controller_name' => 'LoginController',
                'error' => 'Authentication failed',
            ]);
        }

        return $this->render('index.html.twig', [
            'controller_name' => 'AccountController',
        ]);
    }

    #[Route('/account/settings', name: 'app_account_settings')]
    public function settings(AuthenticationUtils $authenticationUtils, Security $security)
    {
        if (!$security->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('app_main');
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $email = $authenticationUtils->getLastUsername();

        if ($error !== null) {
            new JsonResponse(['success' => false, 'message' => 'Authentication failed'], 401);
            return $this->render('index.html.twig', [
                'controller_name' => 'LoginController',
                'error' => 'Authentication failed',
            ]);
        }

        return $this->render('index.html.twig', [
            'controller_name' => 'AccountController',
        ]);
    }
}
