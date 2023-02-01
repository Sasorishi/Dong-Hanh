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

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(MailerService $mailer, Request $request)
    {
        $response = NULL;
        
        if ($request->isMethod('POST')) {
            $response = $mailer->sendMail($request);
            // dump($response);

            if ($response == TRUE) {
                return $this->redirectToRoute('app_success', array('form' => 'contact'));
            } else {
                return $this->redirectToRoute('app_cancel');
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
        $repository = $doctrine->getRepository(Participant::class);
        $participant = $repository->findOneBy(['user' => $this->getUser()->getId()]);

        if (!$participant) {
            $participant = NULL;
            
            if ($request->isMethod('POST')) {
                // dump($request);
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
                
                return $this->redirectToRoute('app_checkout');
            }
        } else {
            dump("data found");
            if ($request->isMethod('POST')) {
                // dump($request);
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
                
                return $this->redirectToRoute('app_checkout');
            }
        }

        
        return $this->render('register.html.twig', [
            'participant' => $participant
        ]);
    }

    #[Route('/checkout', name: 'app_checkout')]
    public function checkout(PaypalService $paypal)
    {
        // $paypal->getOrder();
        // return $this->redirectToRoute('app_success', array('form' => 'contact'));

        return $this->render('checkout.html.twig', [
            'paypalInterface' => $paypal->interface()
        ]);
    }

    #[Route('/signin', name: 'app_signin')]
    public function signin(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine, MailerService $mailer)
    {
        $response = NULL;
        if ($request->isMethod('POST')) {
            $repository = $doctrine->getRepository(User::class);
            $user = $repository->findOneBy(['user' => $this->getUser()->getEmail()]);

            if (!$user) {
                // $ulid = new Ulid();
                $user = new User;
                $user->setEmail($request->request->get("email"));
                $plaintextPassword = $request->request->get("password");
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
    
                $mailer->sendSignin($this->getUser()->getEmail(), $this->getUser()->getEmail());
            } else {
                $response = false;
            }

        }

        return $this->render('account/signin.html.twig', [
            'response' => $response
        ]);
    }

    #[Route('/success', name: 'app_success')]
    public function success(Request $request, ManagerRegistry $doctrine, PaypalService $paypal, MailerService $mailer)
    {
        $response = NULL;
        $repository = $doctrine->getRepository(Event::class);
        $event = $repository->find('1');
        dump($event);

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
                        $orderDetail = json_decode($paypal->getOrder(), true);
                        // dump($orderDetail['result']);
                        $createTime = strtotime($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['create_time']);
                        $updateTime = strtotime($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['update_time']);

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
                        dump($ticket);

                        $entityManager = $doctrine->getManager();
                        $entityManager->persist($participant);
                        $entityManager->persist($ticket);
                        $entityManager->flush();

                        $mailer->sendCheckout($this->getUser()->getEmail(), $participant->getFirstName());
                    }

                    break;
            }
        }

        return $this->render('success.html.twig', [
            'response' => $response
        ]);
    }

    #[Route('/cancel', name: 'app_cancel')]
    public function cancel()
    {
        return $this->render('cancel.html.twig');
    }
}
