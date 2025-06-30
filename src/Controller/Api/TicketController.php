<?php

namespace App\Controller\Api;

use App\Repository\TicketRepository;
use App\Service\QrcodeService;
use Carbon\Carbon;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
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

    #[Route('/user/tickets', name: 'tickets_user', methods: ['GET'])]
    public function getTicketsbyUser(): JsonResponse {
        $userId = $this->getUser()->getId();
        $tickets = $this->ticketRepository->findGroupedTicketsByUser($userId);

        if (empty($tickets)) {
            return new JsonResponse(['tickets' =>  null], Response::HTTP_OK);
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
                'date_start' => $ticket->getEvent() ? ( $ticket->getEvent()->getDateStart() ? Carbon::parse($ticket->getEvent()->getDateStart())->format('F jS') : '' ) : '',
                'date_end' => $ticket->getEvent() ? ( $ticket->getEvent()->getDateEnd() ? Carbon::parse($ticket->getEvent()->getDateEnd())->format('F jS') : '' ) : '',
                'create_at' => $ticket->getCreatedAt() ?? '',
                'eventId' => $ticket->getEvent() ? $ticket->getEvent()->getId() : '',
                'event_label' => $ticket->getEvent() ? $ticket->getEvent()->getLabel() : '',
                'event_category' => $ticket->getEvent() && $ticket->getEvent()->getEventCategory() ? $ticket->getEvent()->getEventCategory()->getLabel() : '',
                'user_id' => $ticket->getUser() ? $ticket->getUser()->getId() : '',
                'firstname' => $ticket->getParticipant() ? $ticket->getParticipant()->getFirstname() : '',
                'lastname' => $ticket->getParticipant() ? $ticket->getParticipant()->getLastname() : '',
                'place' => $ticket->getEvent() ? $ticket->getEvent()->getPlace() : '',
                'location' => $ticket->getEvent() ? $ticket->getEvent()->getLocation() : '',
                'refund_expire_at' => $ticket->getEvent() ? $ticket->getEvent()->getRefundExpireAt() : '',
                'email' => $ticket->getParticipant() ? $ticket->getParticipant()->getEmail() : '',
                'phone' => $ticket->getParticipant() ? $ticket->getParticipant()->getPhone() : '',
                'qrcode' => ($ticket->getParticipant() && $ticket->getEvent()) ? $this->ticketQrcode($ticket->getId(), $ticket->getParticipant()->getId(), $ticket->getEvent()->getId()) : '',
            ];
        }
        return new JsonResponse(['tickets' =>  $ticketData, 'orders' => $orderCreatedAtArray], Response::HTTP_OK);
    }

    #[Route('/ticket/qrcode/generate', name: 'ticket_generate_qrcode')]
    public function ticketQrcode($ticketId, $participantId, $eventId) {
        $qrcode = $this->qrcodeService->generate($ticketId, $participantId, $eventId);
        return $qrcode;
    }

    #[Route('/ticket_check', name: 'ticket_check', methods: ['GET'])]
    public function ticketCheck(Request $request): JsonResponse {
        $secretKey = $this->params->get("app.ticket_insight_key");
        $apiKey = $request->headers->get('API-Key');

        if ($apiKey !== $secretKey) {
            throw new \Exception('Unauthorized access.', Response::HTTP_UNAUTHORIZED);
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
                return new JsonResponse(['success' => false, 'message' => 'Ticket already scanned.', 'ticket' => $ticket, Response::HTTP_ACCEPTED]);
            }

            $this->ticketRepository->scanTicket($ticketData);

            return new JsonResponse(['success' => true, 'message' => 'Ticket valid.', 'ticket' => $ticket, Response::HTTP_ACCEPTED]);
        }
    }

    #[Route('/tickets/getTickets', name: 'getTickets', methods: 'GET')]
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
