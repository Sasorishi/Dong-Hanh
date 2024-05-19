<?php

namespace App\Controller;

use App\Repository\TicketRepository;
use App\Service\QrcodeService;
use Carbon\Carbon;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TicketController extends AbstractController
{
    private $ticketRepository;
    private $qrcodeService;
    private $params;

    public function __construct(TicketRepository $ticketRepository, QrcodeService $qrcodeService, ParameterBagInterface $params)
    {
        $this->ticketRepository = $ticketRepository;
        $this->qrcodeService = $qrcodeService;
        $this->params = $params;
    }

    #[Route('/ticket', name: 'app_ticket')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'TicketController',
        ]);
    }

    #[Route('/api/user/tickets', name: 'api_tickets_user', methods: ['GET'])]
    public function getTicketsbyUser(): JsonResponse {
        $userId = $this->getUser()->getId();
        $tickets = $this->ticketRepository->findGroupedTicketsByUser($userId);

        if (empty($tickets)) {
            return new JsonResponse(['tickets' =>  false]);
        }

        $ticketData = [];
        $orderCreatedAtArray = [];

        foreach ($tickets as $ticket) {
            $orderId = $ticket->getOrderId();
            $createdAt = Carbon::parse($ticket->getCreatedAt())->isoFormat('M-D-YYYY');

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
                'date_start' => Carbon::parse($ticket->getEvent()->getDateStart())->format('F jS'),
                'date_end' => Carbon::parse($ticket->getEvent()->getDateEnd())->format('F jS'),
                'create_at' => $ticket->getCreatedAt(),
                'eventId' => $ticket->getEvent()->getId(),
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
                'qrcode' => $this->ticketQrcode($ticket->getId(), $ticket->getParticipant()->getId(), $ticket->getEvent()->getId()),
            ];
        }
        return new JsonResponse(['tickets' =>  $ticketData, 'orders' => $orderCreatedAtArray]);
    }

    #[Route('/api/ticket/qrcode/generate', name: 'api_ticket_generate_qrcode')]
    public function ticketQrcode($ticketId, $participantId, $eventId) {
        $qrcode = $this->qrcodeService->generate($ticketId, $participantId, $eventId);
        return $qrcode;
    }

    #[Route('/api/ticket_check', name: 'app_ticket_check', methods: ['GET'])]
    public function ticketCheck(Request $request): JsonResponse {
        $secretKey = $this->params->get("app.ticket_insight_key");
        $apiKey = $request->headers->get('API-Key');

        if ($apiKey !== $secretKey) {
            return new JsonResponse(['success' => false, 'message' => 'Unauthorized access.'], Response::HTTP_UNAUTHORIZED);
        }

        $ticketId = $request->query->get('ticket');
        $eventId = $request->query->get('event');
        
        $ticketData = $this->ticketRepository->findOneBy(['id' => $ticketId, 'event' => $eventId]);

        if (!$ticketData) {
            return new JsonResponse(['success' => false, 'message' => 'Ticket invalid.']);
        } else {
            $ticket[] = [
                'ticket ID' => $ticketData->getId(),
                'participant ID' => $ticketData->getParticipant()->getId(),
                'firstname' => $ticketData->getParticipant()->getFirstname(),
                'lastname' => $ticketData->getParticipant()->getLastname(),
                'age' => $ticketData->getParticipant()->getAge(),
                'gender' => $ticketData->getParticipant()->getGender(),
                'event' => $ticketData->getEvent()->getLabel(),
                'event_category' => $ticketData->getEvent()->getEventCategory()->getLabel(),
            ];

            if ($ticketData->isScan()) {
                return new JsonResponse(['success' => false, 'message' => 'Ticket already scanned.', 'ticket' => $ticket]);
            }

            $this->ticketRepository->scanTicket($ticketData);

            return new JsonResponse(['success' => true, 'message' => 'Ticket valid.', 'ticket' => $ticket]);
        }
    }

    #[Route('/api/tickets/getTickets', methods: 'GET')]
    public function getTickets(TicketRepository $ticketRepository): JsonResponse
    {
        $tickets = $ticketRepository->findAll();

        $data = [];
        foreach ($tickets as $ticket) {
            $data[] = [
                'id' => $ticket->getId(),
                'event' => $ticket->getEvent()->getId(),
                'status' => $ticket->getStatus(),
                'price' => $ticket->getPrice(),
                'order' => $ticket->getOrderId(),
                'capture' => $ticket->getCaptureId(),
                'participant' => $ticket->getParticipant()->getId(),
                'user' => $ticket->getUser()->getId(),
                'created_at' => Carbon::parse($ticket->getCreatedAt())->format('d/m/Y'),
                'scan' => $ticket->isScan(),
            ];
        }

        return new JsonResponse(['tickets' =>  $data]);
    }
}
