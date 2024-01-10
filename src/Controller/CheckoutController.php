<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CheckoutController extends AbstractController
{
    #[Route('/checkout', name: 'app_checkout')]
    public function index(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'CheckoutController',
        ]);
    }

    // #[Route('/checkout', name: 'app_checkout')]
    // public function checkout(PaypalService $paypal, ManagerRegistry $doctrine, Request $request)
    // {
    //     $this->denyAccessUnlessGranted('ROLE_USER');
    //     if ($request->isMethod("GET")) {
    //         $ticketRepository = $doctrine->getRepository(Ticket::class);
    //         $participantRepository = $doctrine->getRepository(Participant::class);
    //         $eventRepository = $doctrine->getRepository(Event::class);
    //         $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
    //         $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId()]);
    //         $event = $eventRepository->findOneBy(['id' => $request->query->get('event')]);
    //         $price = $event->getPrice()[$request->query->get('option')];
    //         $expireAt = $event->getRefundExpireAt();

    //         if ($event) {
    //             if ($ticket) {
    //                 if ($ticket->getStatus() == "COMPLETED") {
    //                     return $this->redirectToRoute('app_account'); //If the use already bought it
    //                 }
    //             }
    //         }

    //         if ($price == 75) {
    //             $option = "Without transportation";
    //         } else {
    //             $option = "With transportation included";
    //         }
    //     } else {
    //         return $this->redirectToRoute('app_cancel', array('error' => 'register'));
    //     }

    //     return $this->render('payment/checkout.html.twig', [
    //         'paypalInterface' => $paypal->interface($event, $request->query->get('option')),
    //         'event' => $event,
    //         'price' => $price,
    //         'option' => $option,
    //         'expireAt' => $expireAt
    //     ]);
    // }
}
