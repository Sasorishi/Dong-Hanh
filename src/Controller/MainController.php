<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;
use App\Entity\Participant;
use App\Entity\Ticket;
use App\Entity\Event;
// use App\Service\StripePaymentService;
use App\Service\PaypalService;
use App\Service\MailerService;
use App\Service\QrcodeService;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(MailerService $mailer, Request $request)
    {
        $response = NULL;
        
        if ($request->isMethod('POST')) {
            $response = $mailer->sendMail($request);

            if ($response == TRUE) {
                return $this->redirectToRoute('app_success', array('form' => 'contact'));
            } else {
                return $this->redirectToRoute('app_cancel', array('error' => 'contact'));
            }
        }

        return $this->render('home.html.twig', [
            'response' => $response
        ]);
    }

    #[Route('/register_form', name: 'app_register')]
    public function register(Request $request, ManagerRegistry $doctrine)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $participantRepository = $doctrine->getRepository(Participant::class);
        $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
        $eventRepository = $doctrine->getRepository(Event::class);
        $event = $eventRepository->findOneBy(['id' => "1"]);

        if ($event->isRegister()) {
            if (!$participant) {
                $participant = NULL;
                
                if ($request->isMethod('POST')) {
                    $participant = new Participant;
                    $participant
                    ->setFirstname($request->request->get("firstname"))
                    ->setLastname($request->request->get("lastname"))
                    ->setEmail($request->request->get("email"))
                    ->setPhone($request->request->get("phone"))
                    ->setAddress($request->request->get("address"))
                    ->setCity($request->request->get("city"))
                    ->setState($request->request->get("state"))
                    ->setGender($request->request->get("gender"))
                    ->setAge($request->request->get("age"))
                    ->setExpectations($request->request->get("expectations"))
                    ->setAware($request->request->get("aware"))
                    ->setHealthcare($request->request->get("healthcare"))
                    ->setWaiver($request->request->get("waiver"))
                    ->setGuardian($request->request->get("guardian"))
                    ->setUser($this->getUser()->getId())
                    ->setDate(new \DateTime());
    
                    $entityManager = $doctrine->getManager();
                    $entityManager->persist($participant);
                    $entityManager->flush();

                    return $this->redirectToRoute('app_order');
                }
            } else {
                $ticketRepository = $doctrine->getRepository(Ticket::class);
                $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId()]);

                if ($request->isMethod('POST')) {
                    $participant
                    ->setFirstname($request->request->get("firstname"))
                    ->setLastname($request->request->get("lastname"))
                    ->setEmail($request->request->get("email"))
                    ->setPhone($request->request->get("phone"))
                    ->setAddress($request->request->get("address"))
                    ->setCity($request->request->get("city"))
                    ->setState($request->request->get("state"))
                    ->setGender($request->request->get("gender"))
                    ->setAge($request->request->get("age"))
                    ->setExpectations($request->request->get("expectations"))
                    ->setAware($request->request->get("aware"))
                    ->setHealthcare($request->request->get("healthcare"))
                    ->setWaiver($request->request->get("waiver"))
                    ->setGuardian($request->request->get("guardian"));
    
                    $entityManager = $doctrine->getManager();
                    $entityManager->persist($participant);
                    $entityManager->flush();
                    
                    if ($ticket && $ticket->getStatus() == "COMPLETED") {
                        return $this->redirectToRoute('app_account');
                    } else {
                        return $this->redirectToRoute('app_order');
                    }
                }
            }
        } else {
            return $this->redirectToRoute('app_cancel', array('error' => 'register'));
        }

        
        return $this->render('payment/register.html.twig', [
            'participant' => $participant
        ]);
    }

    #[Route('/order', name: 'app_order')]
    public function order(PaypalService $paypal, ManagerRegistry $doctrine, Request $request)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $eventRepository = $doctrine->getRepository(Event::class);
        $event = $eventRepository->findOneBy(['register' => True]);
        $participantRepository = $doctrine->getRepository(Participant::class);
        $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
        $ticketRepository = $doctrine->getRepository(Ticket::class);
        $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId()]);
        
        if ($event->isRegister()) {
            if ($ticket) {
                if ($ticket->getStatus() == "COMPLETED") {
                    return $this->redirectToRoute('app_account'); //If the use already bought it
                }
            }
            
            if ($request->isMethod("POST")) {
                return $this->redirectToRoute('app_checkout', array('event' => $event->getId(), 'option' => $request->request->get("option")));
            }
        } else {
            return $this->redirectToRoute('app_cancel', array('error' => 'register'));
        }

        return $this->render('payment/order.html.twig', [
            'event' => $event
        ]);
    }

    #[Route('/checkout', name: 'app_checkout')]
    public function checkout(PaypalService $paypal, ManagerRegistry $doctrine, Request $request)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        if ($request->isMethod("GET")) {
            $ticketRepository = $doctrine->getRepository(Ticket::class);
            $participantRepository = $doctrine->getRepository(Participant::class);
            $eventRepository = $doctrine->getRepository(Event::class);
            $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
            $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId()]);
            $event = $eventRepository->findOneBy(['id' => $request->query->get('event')]);
            $price = $event->getPrice()[$request->query->get('option')];
            $expireAt = $event->getRefundExpireAt();

            if ($event) {
                if ($ticket) {
                    if ($ticket->getStatus() == "COMPLETED") {
                        return $this->redirectToRoute('app_account'); //If the use already bought it
                    }
                }
            }

            if ($price == 72) {
                $option = "Without transportation";
            } else {
                $option = "With transportation included";
            }
        } else {
            return $this->redirectToRoute('app_cancel', array('error' => 'register'));
        }

        return $this->render('payment/checkout.html.twig', [
            'paypalInterface' => $paypal->interface($event, $request->query->get('option')),
            'event' => $event,
            'price' => $price,
            'option' => $option,
            'expireAt' => $expireAt
        ]);
    }

    #[Route('/signin', name: 'app_signin')]
    public function signin(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine, MailerService $mailer)
    {
        if ($request->isMethod('POST')) {
            $repository = $doctrine->getRepository(User::class);
            $user = $repository->findOneBy(['email' => $request->request->get("_username")]);

            if (!$user) {
                // $ulid = new Ulid();
                if ($request->request->get("_password") == ($request->request->get("_confirmPassword"))) {
                    $user = new User;
                    $user->setEmail($request->request->get("_username"));
                    $plaintextPassword = $request->request->get("_password");
                    // hash the password (based on the security.yaml config for the $user class)
                    $hashedPassword = $passwordHasher->hashPassword(
                        $user,
                        $plaintextPassword
                    );
                    $user->setPassword($hashedPassword);
                    $user->setRoles(['user']);
        
                    $entityManager = $doctrine->getManager();
                    $entityManager->persist($user);
                    $entityManager->flush();
    
                    return $this->redirectToRoute('app_success', array('form' => 'signin', 'user' => $request->request->get("_username")));
                } else {
                    $this->addFlash('error', 'Password isn\'t the same.');
                }
            } else {
                $this->addFlash('error', 'Email already used.');
            }

        }

        return $this->render('account/signin.html.twig', [
            // 'error' => $error
        ]);
    }

    #[Route('/success', name: 'app_success')]
    public function success(Request $request, ManagerRegistry $doctrine, PaypalService $paypal, MailerService $mailer, QrcodeService $qrcode)
    {
        $response = NULL;
        $repository = $doctrine->getRepository(Event::class);
        $event = $repository->find('1');

        if ($request->isMethod('GET')) {
            $form = $request->query->get('form');
            switch ($form) {
                case 'contact':
                    $response = "contact";
                    break;
                
                case 'checkout':
                    $this->denyAccessUnlessGranted('ROLE_USER');

                    $response = "checkout";
                    $transactionId = $request->query->get('transaction_id');
                    $repository = $doctrine->getRepository(Participant::class);
                    $participant = $repository->findOneBy(['user' => $this->getUser()->getId()]);

                    if (!$participant) {
                        throw $this->createNotFoundException(
                            'No participant found'
                        );
                    } else {
                        $participant->setPayment($transactionId);
                        $orderDetail = json_decode($paypal->getOrder($transactionId), true);
                        $createTime = strtotime($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['create_time']);
                        $updateTime = strtotime($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['update_time']);

                        $ticketRepository = $doctrine->getRepository(Ticket::class);
                        $ticket = $ticketRepository->findOneBy(['orderId' => $orderDetail['result']['id']]);
                        $entityManager = $doctrine->getManager();

                        if (!$ticket) {
                            $ticket = new Ticket;
                            $ticket
                            ->setPrice($orderDetail['result']['purchase_units'][0]['amount']['value'])
                            ->setCreateTime(new \DateTime(date('Y-m-d H:i:s', $createTime)))
                            ->setUpdateTime(new \DateTime(date('Y-m-d H:i:s', $updateTime)))
                            ->setStatus($orderDetail['result']['status'])
                            ->setCurrency($orderDetail['result']['purchase_units'][0]['amount']['currency_code'])
                            ->setOrderId($orderDetail['result']['id'])
                            ->setCaptureId($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['id'])
                            ->setIdEvent($event)
                            ->setParticipant($participant->getId());

                            $entityManager->persist($participant);
                            $entityManager->persist($ticket);
                            $entityManager->flush();

                            $qrcodeTicket = $qrcode->generate($orderDetail['result']['id']);
                            $mailer->sendCheckout($this->getUser()->getEmail(), $participant, $qrcodeTicket) ;
                        } else {
                            $ticket
                            ->setPrice($orderDetail['result']['purchase_units'][0]['amount']['value'])
                            ->setUpdateTime(new \DateTime(date('Y-m-d H:i:s', $updateTime)))
                            ->setStatus($orderDetail['result']['status'])
                            ->setCurrency($orderDetail['result']['purchase_units'][0]['amount']['currency_code'])
                            ->setOrderId($orderDetail['result']['id'])
                            ->setCaptureId($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['id']);
                            $entityManager->persist($ticket);
                            $entityManager->flush();
                        }
                    }

                    break;

                case 'refund':
                    $this->denyAccessUnlessGranted('ROLE_USER');

                    $response = "refund";
                    $ticketRepository = $doctrine->getRepository(Ticket::class);
                    $ticket = $ticketRepository->findOneBy(['orderId' => $request->query->get('orderId')]);
                    $participantRepository = $doctrine->getRepository(Participant::class);
                    $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
                    if ($ticket->getStatus() == "COMPLETED") {
                        $ticket->setStatus("REFUND");
                        $participant->setPayment(false);
    
                        $entityManager = $doctrine->getManager();
                        $entityManager->persist($ticket);
                        $entityManager->flush();
                        $entityManager->persist($participant);
                        $entityManager->flush();

                        $mailer->sendRefund($this->getUser()->getEmail(), $participant);
                    }
                    break;
                
                case 'signin':
                    $response = "signin";
                    $mailer->sendSignin($request->query->get("user"), $request->query->get("user"));
                    break;

                case 'forgottenPassword':
                    $response = "forgottenPassword";
                    break;
            }
        }

        return $this->render('success.html.twig', [
            'response' => $response
        ]);
    }

    #[Route('/cancel', name: 'app_cancel')]
    public function cancel(Request $request)
    {
        if ($request->isMethod('GET')) {
            $error = $request->query->get('error');

            switch ($error) {
                case 'register':
                    $response = "register";
                    break;

                case 'contact':
                    $response = "contact";
                    break;

                case 'forgottenPassword':
                    $response = "forgottenPassword";
                    break;

                case 'checkout':
                    $response = "checkout";
                    break;

                default:
                    $response = "default";
                    break;
            }
        }

        return $this->render('cancel.html.twig', [
            'response' => $response
        ]);
    }
}
