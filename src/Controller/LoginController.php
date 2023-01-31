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
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use chillerlan\QRCode\QRCode;
use App\Entity\User;
use App\Entity\Participant;
use App\Entity\Ticket;


class LoginController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {        
        $error = $authenticationUtils->getLastAuthenticationError();
        $email = $authenticationUtils->getLastUsername();
        dump($error);
        
        return $this->render('account/login.html.twig', [
            'controller_name' => 'LoginController',
            'last_username' => $email,
            'error'         => $error
        ]);
    }

    #[Route('/account', name: 'app_account')]
    public function account(Request $request, ManagerRegistry $doctrine)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $email = $this->getUser()->getEmail();
        $participantRepository = $doctrine->getRepository(Participant::class);
        $ticketRepository = $doctrine->getRepository(Ticket::class);
        $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
        $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId()]);
        $domain = 'dong-hanh.org';
        $data = $domain.'?order='.$ticket->getOrderId();
        
        return $this->render('account/tickets.html.twig', [
            'controller_name' => 'LoginController',
            'currentuser' => $email,
            'ticket' => $ticket,
            'ticket_qrcode' => (new QRCode)->render($data)
        ]);
    }

    #[Route('/account_reset_password', name: 'app_reset_password')]
    public function resetPassword(AuthenticationUtils $authenticationUtils, Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $email = $this->getUser()->getEmail();

        if ($request->isMethod('POST')) {
            $repository = $doctrine->getRepository(User::class);
            $user = $repository->findOneBy(['email' => $email]);

            $plaintextPassword = $request->request->get("password");
            // hash the password (based on the security.yaml config for the $user class)
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );
            $user->setPassword($hashedPassword);

            $entityManager = $doctrine->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
        }
        
        return $this->render('account/password.html.twig', [
            'currentuser' => $email
        ]);
    }

    #[Route('/ticket_check', name: 'app_ticket_check')]
    public function ticketCheck(Request $request, ManagerRegistry $doctrine)
    {
        if ($request->isMethod('GET')) {
            $request->request->get("ticket_id");
            $repository = $doctrine->getRepository(Ticket::class);
            $ticket = $repository->findOneBy(['participant' => $request->query->get('order')]);
            // dump($ticket);
        }

        return $this->render('account/check.html.twig', [
            'ticket' => $ticket
        ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
        return $this->redirectToRoute('login');
    }
}
