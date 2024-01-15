<?php

namespace App\Controller;

use App\Repository\TicketRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class TicketController extends AbstractController
{
    private $ticketRepository;

    public function __construct(TicketRepository $ticketRepository)
    {
        $this->ticketRepository = $ticketRepository;
    }

    #[Route('/ticket', name: 'app_ticket')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'TicketController',
        ]);
    }

    #[Route('/api/user/tickets', name: 'api_tickets_user', methods: ['GET'])]
    public function getTicketsbyUser(NormalizerInterface $normalizer): JsonResponse {
        $userId = $this->getUser()->getId();
        $tickets = $this->ticketRepository->findGroupedTicketsByUser($userId);

        if (empty($tickets)) {
            return new JsonResponse(['tickets' =>  false]);
        }

        $ticketData = [];
        $orderCreatedAtArray = [];

        foreach ($tickets as $ticket) {
            $orderId = $ticket->getOrderId();
            $createdAt = $ticket->getCreatedAt();

            $orderIdExists = false;
            foreach ($orderCreatedAtArray as $item) {
                if ($item['order_id'] === $orderId) {
                    $orderIdExists = true;
                    break;
                }
            }

            if (!$orderIdExists) {
                $orderCreatedAtArray[] = [
                    'order_id' => $orderId,
                    'created_at' => $createdAt,
                ];
            }

            if (!isset($ticketData[$orderId])) {
                $ticketData[$orderId] = [];
            }

            $ticketData[$orderId][] = [
                'id' => $ticket->getId(),
                'price' => $ticket->getPrice(),
                'currency' => $ticket->getCurrency(),
                'status' => $ticket->getStatus(),
                'capture_id' => $ticket->getCaptureId(),
                'order_id' => $orderId,
                'date_start' => $ticket->getEvent()->getDateStart(),
                'date_end' => $ticket->getEvent()->getDateEnd(),
                'create_at' => $ticket->getCreatedAt(),
                'event_label' => $ticket->getEvent()->getLabel(),
                'event_category' => $ticket->getEvent()->getEventCategory()->getLabel(),
                'user_id' => $ticket->getUser()->getId(),
                'firstname' => $ticket->getParticipant()->getFirstname(),
                'lastname' => $ticket->getParticipant()->getLastname(),
                'place' => $ticket->getEvent()->getPlace(),
                'location' =>$ticket->getEvent()->getLocation(),
                'refund_expire_at' =>$ticket->getEvent()->getRefundExpireAt(),
                'email' => $ticket->getParticipant()->getEmail(),
                'phone' => $ticket->getParticipant()->getPhone(),
            ];
        }
        return new JsonResponse(['tickets' =>  $ticketData, 'orders' => $orderCreatedAtArray]);
    }


    #[Route('/api/ticket_check', name: 'api_ticket_check')]
    public function ticketCheck(): JsonResponse {
        // if ($request->isMethod('GET')) {
        //     $orderId = $request->query->get('order');
        //     $repository = $doctrine->getRepository(Ticket::class);
        //     $ticket = $repository->findOneBy(['orderId' => $orderId]);
        //     $error = null;

        //     if ($ticket->isScan() == True) {
        //         $error = true;
        //     } else {
        //         $ticket->setScan(True);
        //         $entityManager = $doctrine->getManager();
        //         $entityManager->persist($ticket);
        //         $entityManager->flush();
        //     }
        // }

        return new JsonResponse(['tickets' =>  $tickets]);
    }
}
