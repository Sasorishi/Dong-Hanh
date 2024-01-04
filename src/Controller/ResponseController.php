<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResponseController extends AbstractController
{
    #[Route('/response/{type}', name: 'app_response')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'ResponseController',
        ]);
    }

    // #[Route('/success', name: 'app_success')]
    // public function success(Request $request, ManagerRegistry $doctrine, PaypalService $paypal, MailerService $mailer, QrcodeService $qrcode)
    // {
    //     $response = NULL;
    //     $repository = $doctrine->getRepository(Event::class);
    //     $event = $repository->find('1');

    //     if ($request->isMethod('GET')) {
    //         $form = $request->query->get('form');
    //         switch ($form) {
    //             case 'contact':
    //                 $response = "contact";
    //                 break;
                
    //             case 'checkout':
    //                 $this->denyAccessUnlessGranted('ROLE_USER');

    //                 $response = "checkout";
    //                 $transactionId = $request->query->get('transaction_id');
    //                 $repository = $doctrine->getRepository(Participant::class);
    //                 $participant = $repository->findOneBy(['user' => $this->getUser()->getId()]);

    //                 if (!$participant) {
    //                     throw $this->createNotFoundException(
    //                         'No participant found'
    //                     );
    //                 } else {
    //                     $participant->setPayment($transactionId);
    //                     $orderDetail = json_decode($paypal->getOrder($transactionId), true);
    //                     $createTime = strtotime($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['create_time']);
    //                     $updateTime = strtotime($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['update_time']);

    //                     $ticketRepository = $doctrine->getRepository(Ticket::class);
    //                     $ticket = $ticketRepository->findOneBy(['orderId' => $orderDetail['result']['id']]);
    //                     $entityManager = $doctrine->getManager();

    //                     if (!$ticket) {
    //                         $ticket = new Ticket;
    //                         $ticket
    //                         ->setPrice($orderDetail['result']['purchase_units'][0]['amount']['value'])
    //                         ->setCreateTime(new \DateTime(date('Y-m-d H:i:s', $createTime)))
    //                         ->setUpdateTime(new \DateTime(date('Y-m-d H:i:s', $updateTime)))
    //                         ->setStatus($orderDetail['result']['status'])
    //                         ->setCurrency($orderDetail['result']['purchase_units'][0]['amount']['currency_code'])
    //                         ->setOrderId($orderDetail['result']['id'])
    //                         ->setCaptureId($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['id'])
    //                         ->setIdEvent($event)
    //                         ->setParticipant($participant->getId());

    //                         $entityManager->persist($participant);
    //                         $entityManager->persist($ticket);
    //                         $entityManager->flush();

    //                         $qrcodeTicket = $qrcode->generate($orderDetail['result']['id']);
    //                         $mailer->sendCheckout($this->getUser()->getEmail(), $participant, $qrcodeTicket) ;
    //                     } else {
    //                         $ticket
    //                         ->setPrice($orderDetail['result']['purchase_units'][0]['amount']['value'])
    //                         ->setUpdateTime(new \DateTime(date('Y-m-d H:i:s', $updateTime)))
    //                         ->setStatus($orderDetail['result']['status'])
    //                         ->setCurrency($orderDetail['result']['purchase_units'][0]['amount']['currency_code'])
    //                         ->setOrderId($orderDetail['result']['id'])
    //                         ->setCaptureId($orderDetail['result']['purchase_units'][0]['payments']['captures'][0]['id']);
    //                         $entityManager->persist($ticket);
    //                         $entityManager->flush();
    //                     }
    //                 }

    //                 break;

    //             case 'refund':
    //                 $this->denyAccessUnlessGranted('ROLE_USER');

    //                 $response = "refund";
    //                 $ticketRepository = $doctrine->getRepository(Ticket::class);
    //                 $ticket = $ticketRepository->findOneBy(['orderId' => $request->query->get('orderId')]);
    //                 $participantRepository = $doctrine->getRepository(Participant::class);
    //                 $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
    //                 if ($ticket->getStatus() == "COMPLETED") {
    //                     $ticket->setStatus("REFUND");
    //                     $participant->setPayment(false);
    
    //                     $entityManager = $doctrine->getManager();
    //                     $entityManager->persist($ticket);
    //                     $entityManager->flush();
    //                     $entityManager->persist($participant);
    //                     $entityManager->flush();

    //                     $mailer->sendRefund($this->getUser()->getEmail(), $participant);
    //                 }
    //                 break;
                
    //             case 'signin':
    //                 $response = "signin";
    //                 $mailer->sendSignin($request->query->get("user"), $request->query->get("user"));
    //                 break;

    //             case 'forgottenPassword':
    //                 $response = "forgottenPassword";
    //                 break;
    //         }
    //     }

    //     return $this->render('success.html.twig', [
    //         'response' => $response
    //     ]);
    // }

    // #[Route('/cancel', name: 'app_cancel')]
    // public function cancel(Request $request)
    // {
    //     if ($request->isMethod('GET')) {
    //         $error = $request->query->get('error');

    //         switch ($error) {
    //             case 'register':
    //                 $response = "register";
    //                 break;

    //             case 'contact':
    //                 $response = "contact";
    //                 break;

    //             case 'forgottenPassword':
    //                 $response = "forgottenPassword";
    //                 break;

    //             case 'checkout':
    //                 $response = "checkout";
    //                 break;

    //             default:
    //                 $response = "default";
    //                 break;
    //         }
    //     }

    //     return $this->render('cancel.html.twig', [
    //         'response' => $response
    //     ]);
    // }
}
