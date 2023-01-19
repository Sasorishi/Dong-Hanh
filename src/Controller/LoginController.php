<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;

class LoginController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {        
        $error = $authenticationUtils->getLastAuthenticationError();
        $email = $authenticationUtils->getLastUsername();
        dump($email);
        
        return $this->render('login.html.twig', [
            'controller_name' => 'LoginController',
            'last_username' => $email,
            'error'         => $error
        ]);
    }

    #[Route('/account', name: 'app_account')]
    public function account(AuthenticationUtils $authenticationUtils)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $email = $this->getUser()->getEmail();
        
        return $this->render('account.html.twig', [
            'controller_name' => 'LoginController',
            'currentuser' => $email
        ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
        return $this->redirectToRoute('login');
    }
}
