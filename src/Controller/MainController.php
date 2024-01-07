<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Event;
use App\Entity\Ticket;
use App\Entity\Participant;
use App\Service\MailerService;
use App\Service\PaypalService;
use App\Service\QrcodeService;
use App\Service\RecaptchaService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
// use App\Service\StripePaymentService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(MailerService $mailer, RecaptchaService $recaptcha, Request $request): Response
    {
        if ($request->isMethod('GET') && $request->query->get('response') !== null) {
            $response = $request->query->get('response');
            dump($response);
            return $this->render('index.html.twig', [
                'recaptcha_key' => $recaptcha->getKey(),
                'error' => $response
            ]);
        }
        
        // if ($request->isMethod('POST')) {
        //     $validator = $recaptcha->requestApi($request->request->get("g-recaptcha-response"));
        //     if ($validator["success"] == true) {
        //         $response = $mailer->sendMail($request);
    
        //         if ($response == TRUE) {
        //             return $this->redirectToRoute('app_success', array('form' => 'contact'));
        //         } else {
        //             return $this->redirectToRoute('app_cancel', array('error' => 'contact'));
        //         }
        //     } else {
        //         return $this->redirectToRoute('app_cancel', array('error' => 'contact'));
        //     }
        // }

        return $this->render('index.html.twig', [
            'recaptcha_key' => $recaptcha->getKey(),
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

            if ($price == 75) {
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
}
