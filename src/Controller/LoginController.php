<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;
use App\Entity\Participant;
use App\Entity\Ticket;
use App\Entity\Event;
use App\Service\MailerService;
use App\Service\QrcodeService;
use App\Service\PaypalService;
use Symfony\Bundle\SecurityBundle\Security;

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
            new JsonResponse(['success' => false, 'message' => 'Authentication failed'], 401);
            return $this->render('index.html.twig', [
                'controller_name' => 'LoginController',
                'error' => 'Authentication failed',
            ]);
        }

        return $this->render('index.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    #[Route('/api/is-authenticated', name: 'api_is_authenticated')]
    public function isAuthenticated(Security $security): JsonResponse
    {
        $isAuthenticated = $security->isGranted('IS_AUTHENTICATED_FULLY');

        return new JsonResponse(['isAuthenticated' => $isAuthenticated]);
    }

    #[Route('/account_forgotten_password', name: 'app_forgotten_password')]
    public function forgottenPassword(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher, MailerService $mailer, TokenGeneratorInterface $tokenGenerator)
    {
        $tokenAccess = null;
        $response = null;
        if ($request->query->get('token')) {
            $tokenAccess = true;
            $repository = $doctrine->getRepository(User::class);
            $user = $repository->findOneBy(['tokenPassword' => $request->query->get('token')]);

            if ($user) {
                if ($user->getPasswordRequestAt()) {
                    $requestAt = $user->getPasswordRequestAt();

                    if ($requestAt->modify('+1 hour') > new \Datetime()) {
                        if ($request->isMethod('POST')) {
                            if ($request->request->get("password") == $request->request->get("passwordVerified")) {
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
            
                                return $this->redirectToRoute('app_success', array('form' => 'forgottenPassword'));
                            } else {
                                $response = false;
                            }
                        }
                    } else {
                        return $this->redirectToRoute('app_cancel', array('error' => 'forgottenPassword'));
                    }
                }
            } else {
                return $this->redirectToRoute('app_cancel', array('error' => 'forgottenPassword'));
            }
        } else {
            $tokenAccess = false;
            if ($request->isMethod('POST')) {
                $userRepository = $doctrine->getRepository(User::class);
                $user = $userRepository->findOneBy(['email' => $request->request->get("email")]);
    
                if ($user) {
                    $token = $tokenGenerator->generateToken();
                    $user->setTokenPassword($token);
                    $user->setPasswordRequestAt(new \DateTime());
                    $entityManager = $doctrine->getManager();
                    $entityManager->persist($user);
                    $entityManager->flush();
                    $mailer->sendPassword($user->getEmail(), $token);
                    $response = true;
                } else {
                    $response = false;
                }
            }
        }

        return $this->render('account/forgottenPassword.html.twig', [
            'tokenAccess' => $tokenAccess,
            'response' => $response
        ]);
    }

    #[Route('/account', name: 'app_account')]
    public function account(Request $request, ManagerRegistry $doctrine, QrcodeService $qrcode, PaypalService $paypal, MailerService $mailer)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $email = $this->getUser()->getEmail();
        $participantRepository = $doctrine->getRepository(Participant::class);
        $ticketRepository = $doctrine->getRepository(Ticket::class);
        $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
        $ticket = NULL;
        $qrcodeTicket = NULL;

        $expire = false;

        if ($participant) {
            $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId(), 'status' => 'COMPLETED']);

            if ($ticket) {
                $eventRepository = $doctrine->getRepository(Event::class);
                $event = $eventRepository->findOneBy(['id' => $ticket->getIdEvent()]);
                if ($event) {
                    $qrcodeTicket = $qrcode->generate($ticket->getOrderId());
                    $expireAt = $event->getRefundExpireAt();

                    if (new \Datetime() > $expireAt) {
                        $expire = true;
                    }
                }
            }

            if ($request->isMethod("POST")) {
                $response = $paypal->refundOrder($ticket);
    
                // if ($response['RESULT']['STATUS'] == "COMPLETE") {
                    // $ticket->setStatus("REFUND");
    
                    // $entityManager = $doctrine->getManager();
                    // $entityManager->persist($ticket);
                    // $entityManager->flush();
    
                    return $this->redirectToRoute('app_success', array('form' => 'refund', 'orderId' => $ticket->getOrderId()));
                // }
            }
        }
        
        return $this->render('account/tickets.html.twig', [
            'controller_name' => 'LoginController',
            'currentuser' => $email,
            'ticket' => $ticket,
            'ticket_qrcode' => $qrcodeTicket,
            'expire' => $expire
        ]);
    }

    #[Route('/account_reset_password', name: 'app_reset_password')]
    public function resetPassword(AuthenticationUtils $authenticationUtils, Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $email = $this->getUser()->getEmail();
        $response = NULL;

        if ($request->isMethod('POST')) {
            if ($request->request->get("password") == $request->request->get("passwordVerified")) {
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

                $response = true;
            } else {
                $response = false;
            }
        }
        
        return $this->render('account/password.html.twig', [
            'currentuser' => $email,
            'response' => $response
        ]);
    }

    #[Route('/account_email', name: 'app_email')]
    public function changeEmail(Request $request, ManagerRegistry $doctrine)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $email = $this->getUser()->getEmail();
        $response = NULL;

        if ($request->isMethod('POST')) {
            if ($email != $request->request->get("email")) {
                $repository = $doctrine->getRepository(User::class);
                $user = $repository->findOneBy(['email' => $email]);
                $user->setEmail($request->request->get("email"));
    
                $entityManager = $doctrine->getManager();
                $entityManager->persist($user);
                $entityManager->flush();

                $response = true;
            } else {
                $response = false;
            }
        }
        
        return $this->render('account/email.html.twig', [
            'currentuser' => $email,
            'response' => $response
        ]);
    }

    #[Route('/ticket_check', name: 'app_ticket_check')]
    public function ticketCheck(Request $request, ManagerRegistry $doctrine)
    {
        if ($request->isMethod('GET')) {
            $orderId = $request->query->get('order');
            $repository = $doctrine->getRepository(Ticket::class);
            $ticket = $repository->findOneBy(['orderId' => $orderId]);
            $error = null;

            if ($ticket->isScan() == True) {
                $error = true;
            } else {
                $ticket->setScan(True);
                $entityManager = $doctrine->getManager();
                $entityManager->persist($ticket);
                $entityManager->flush();
            }
        }

        return $this->render('account/check.html.twig', [
            'ticket' => $ticket,
            'error' => $error
        ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
        return $this->redirectToRoute('login');
    }
}
