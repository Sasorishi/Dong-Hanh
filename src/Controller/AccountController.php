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

    // #[Route('/account', name: 'app_account')]
    // public function index(Request $request, ManagerRegistry $doctrine, QrcodeService $qrcode, PaypalService $paypal, MailerService $mailer)
    // {
    //     $email = $this->getUser()->getEmail();
    //     $participantRepository = $doctrine->getRepository(Participant::class);
    //     $ticketRepository = $doctrine->getRepository(Ticket::class);
    //     $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
    //     $ticket = NULL;
    //     $qrcodeTicket = NULL;

    //     $expire = false;

    //     if ($participant) {
    //         $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId(), 'status' => 'COMPLETED']);

    //         if ($ticket) {
    //             $eventRepository = $doctrine->getRepository(Event::class);
    //             $event = $eventRepository->findOneBy(['id' => $ticket->getIdEvent()]);
    //             if ($event) {
    //                 $qrcodeTicket = $qrcode->generate($ticket->getOrderId());
    //                 $expireAt = $event->getRefundExpireAt();

    //                 if (new \Datetime() > $expireAt) {
    //                     $expire = true;
    //                 }
    //             }
    //         }

    //         if ($request->isMethod("POST")) {
    //             $response = $paypal->refundOrder($ticket);
    
    //             // if ($response['RESULT']['STATUS'] == "COMPLETE") {
    //                 // $ticket->setStatus("REFUND");
    
    //                 // $entityManager = $doctrine->getManager();
    //                 // $entityManager->persist($ticket);
    //                 // $entityManager->flush();
    
    //                 return $this->redirectToRoute('app_success', array('form' => 'refund', 'orderId' => $ticket->getOrderId()));
    //             // }
    //         }
    //     }
        
    //     return $this->render('account/tickets.html.twig', [
    //         'controller_name' => 'LoginController',
    //         'currentuser' => $email,
    //         'ticket' => $ticket,
    //         'ticket_qrcode' => $qrcodeTicket,
    //         'expire' => $expire
    //     ]);
    // }

    // #[Route('/account_reset_password', name: 'app_reset_password')]
    // public function resetPassword(AuthenticationUtils $authenticationUtils, Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher)
    // {
    //     $this->denyAccessUnlessGranted('ROLE_USER');
    //     $email = $this->getUser()->getEmail();
    //     $response = NULL;

    //     if ($request->isMethod('POST')) {
    //         if ($request->request->get("password") == $request->request->get("passwordVerified")) {
    //             $repository = $doctrine->getRepository(User::class);
    //             $user = $repository->findOneBy(['email' => $email]);
    
    //             $plaintextPassword = $request->request->get("password");
    //             // hash the password (based on the security.yaml config for the $user class)
    //             $hashedPassword = $passwordHasher->hashPassword(
    //                 $user,
    //                 $plaintextPassword
    //             );
    //             $user->setPassword($hashedPassword);
    
    //             $entityManager = $doctrine->getManager();
    //             $entityManager->persist($user);
    //             $entityManager->flush();

    //             $response = true;
    //         } else {
    //             $response = false;
    //         }
    //     }
        
    //     return $this->render('account/password.html.twig', [
    //         'currentuser' => $email,
    //         'response' => $response
    //     ]);
    // }

    // #[Route('/account_email', name: 'app_email')]
    // public function changeEmail(Request $request, ManagerRegistry $doctrine)
    // {
    //     $this->denyAccessUnlessGranted('ROLE_USER');
    //     $email = $this->getUser()->getEmail();
    //     $response = NULL;

    //     if ($request->isMethod('POST')) {
    //         if ($email != $request->request->get("email")) {
    //             $repository = $doctrine->getRepository(User::class);
    //             $user = $repository->findOneBy(['email' => $email]);
    //             $user->setEmail($request->request->get("email"));
    
    //             $entityManager = $doctrine->getManager();
    //             $entityManager->persist($user);
    //             $entityManager->flush();

    //             $response = true;
    //         } else {
    //             $response = false;
    //         }
    //     }
        
    //     return $this->render('account/email.html.twig', [
    //         'currentuser' => $email,
    //         'response' => $response
    //     ]);
    // }
}
